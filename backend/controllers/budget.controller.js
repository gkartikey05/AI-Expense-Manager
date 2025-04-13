const prisma = require("../utils/prisma");
const {
  budgetSchema,
} = require("../utils/zodSchema");

// ---------------add budget controller-----------
const addBudget = async (req, res) => {
  const userId = req.userId;
  try {
    const result = budgetSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { category, amount } = result.data;

    // check if budget category already exists
    const existing = await prisma.budget.findFirst({
      where: {
        userId,
        category,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Budget already set for this category",
      });
    }

    const budget = await prisma.budget.create({
      data: {
        userId,
        category,
        amount,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ------------update budget--------------------
const updateBudget = async (req, res) => {
  const userId = req.userId;
  const id = Number(req.params.id);
  try {
    const result = budgetSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { category, amount } = result.data;

    // Find the existing budget
    const existing = await prisma.budget.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this category",
      });
    }

    // Update budget using Id
    const updatedBudget = await prisma.budget.update({
      where: { id: existing.id },
      data: {
        category,
        amount,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      budget: updatedBudget,
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// -------------delete budget-------------
const deleteBudget = async (req, res) => {
  const userId = req.userId;
  const id = Number(req.params.id);
  console.log("id:", id);

  try {
    //check if the budget exists for the given user
    const existing = await prisma.budget.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    // Delete by unique id
    await prisma.budget.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// -------------get all budget of a user-------------
const getAllBudgets = async (req, res) => {
  const userId = req.userId;

  try {
    // Step 1: Get all budgets of user
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { category: "asc" },
    });

    if (!budgets.length) {
      return res.status(200).json({
        success: true,
        message: "No budgets found",
        budgets: [],
      });
    }

    // Step 2: Get total expenses grouped by category
    const expenses = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        category: { in: budgets.map((budget) => budget.category) },
      },
      _sum: {
        amount: true,
      },
    });

    // Step 3: Map and attach "used" to each budget
    const result = budgets.map((budget) => {
      const matchedExpense = expenses.find(
        (e) => e.category === budget.category
      );
      return {
        ...budget,
        category: budget.category,
        amount: budget.amount,
        used: matchedExpense?._sum.amount || 0,
      };
    });

    return res.status(200).json({
      success: true,
      budgets: result,
    });
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
};
