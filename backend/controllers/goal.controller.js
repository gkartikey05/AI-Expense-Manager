const prisma = require("../utils/prisma");
const { goalSchema } = require("../utils/zodSchema");

// -------add goal controller-----------
const addGoal = async (req, res) => {
  const userId = req.userId;

  try {
    const result = goalSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((i) => i.message).join(", "),
      });
    }

    const { goalName } = result.data;

    const exists = await prisma.goal.findFirst({
      where: {
        userId,
        goalName,
      },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Goal already exists, update it instead.",
      });
    }

    const newGoal = await prisma.goal.create({
      data: {
        ...result.data,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "New goal added successfully.",
      newGoal,
    });
  } catch (err) {
    console.error("Add Goal Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ---------update goal-------------------
const updateGoal = async (req, res) => {
  const userId = req.userId;
  const { goalId } = req.params;

  try {
    const result = goalSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((i) => i.message),
      });
    }

    // Check if the goal exists
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
      },
    });

    if (!existingGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or does not belong to the user.",
      });
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        ...result.data,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Goal updated successfully.",
      updatedGoal,
    });
  } catch (err) {
    console.error("Update Goal Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//   ----------delete goal----------------
const deleteGoal = async (req, res) => {
  const userId = req.userId;
  const { goalId } = req.params;

  try {
    // Check if the goal exists and belongs to the user
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
      },
    });

    if (!existingGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or does not belong to the user.",
      });
    }

    await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Goal deleted successfully.",
    });
  } catch (err) {
    console.error("Delete Goal Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ----------get all goals of a user----------
const getAllGoals = async (req, res) => {
  const userId = req.userId;

  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all goals successfully.",
      goals,
    });
  } catch (err) {
    console.error("Get All Goals Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//--------------add ammount to goal--------------
const addAmountToGoal = async (req, res) => {
  const userId = req.userId;
  const { goalId } = req.params;
  const { amount } = req.body;

  try {
    // Basic validation
    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number.",
      });
    }

    // Find the goal
    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found .",
      });
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        amount: goal.amount + amount,
      },
    });

    return res.status(200).json({
      success: true,
      message: `{amount} added to goal.`,
      updatedGoal,
    });
  } catch (err) {
    console.error("Add Amount to Goal Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  addGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
  addAmountToGoal,
};
