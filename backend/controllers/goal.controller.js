const prisma = require("../utils/prisma");
const { goalSchema, updateGoalSchema } = require("../utils/zodSchema");

// -------add goal controller-----------
const addGoal = async (req, res) => {
  const userId = req.userId;

  try {
    const result = goalSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((i) => i.message),
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
      message: "goal added",
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

//   ----------delete goal----------------
const deleteGoal = async (req, res) => {
  const userId = req.userId;
  const id = Number(req.params.id);

  try {
    // Check if the goal exists and belongs to the user
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    await prisma.goal.delete({
      where: {
        id: existingGoal.id,
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

    if (goals.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No goals found",
        goals,
      });
    }

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
  const id = Number(req.params.id);
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
        id,
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
        id: goal.id,
      },
      data: {
        savedAmount: Number(goal.savedAmount) + amount,
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
  deleteGoal,
  getAllGoals,
  addAmountToGoal,
};
