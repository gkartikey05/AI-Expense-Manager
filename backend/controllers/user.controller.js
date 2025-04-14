const prisma = require("../utils/prisma");
const { userSchema } = require("../utils/zodSchema");
const uploadToCloudinary = require("../config/cloudinary");

//----------------get user data---------------
const getUserData = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        transactions: true,
        goals: true,
        budgets: true,
      },
      omit: { password: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ------------user update controller-----------------
const updateUserData = async (req, res) => {
  const userId = req.userId;

  try {
    const file = req.file;

    // Validate data
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { fullName, phoneNumber } = result.data;

    // Create update object
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    // Upload image if exists
    if (file) {
      const imageUrl = await uploadToCloudinary(file.path);
      if (imageUrl) updateData.profile = imageUrl;
    }

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ---------------get a users financial data-aggregation-----------
const getAggregatedData = async (req, res) => {
  const userId = req.userId;

  try {
    // Total income
    const totalIncome = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "INCOME",
      },
    });

    // Total expense
    const totalExpense = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: "EXPENSE",
      },
    });

    // Total budget
    const totalBudget = await prisma.budget.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
      },
    });

    // Total budget spend (based on matching category in transactions)
    const budgets = await prisma.budget.findMany({
      where: { userId },
      select: { category: true },
    });

    const expenses = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        category: {
          in: budgets.map((b) => b.category),
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Calculate total budget spend
    const totalBudgetSpend = expenses.reduce(
      (sum, item) => sum + (Number(item._sum.amount) || 0),
      0
    );

    // Total goal target amount
    const totalGoalsAmount = await prisma.goal.aggregate({
      _sum: {
        targetAmount: true,
      },
      where: {
        userId,
      },
    });

    // Total saved toward goals
    const totalGoalAmountSaved = await prisma.goal.aggregate({
      _sum: {
        savedAmount: true,
      },
      where: {
        userId,
      },
    });

    // Final financial data (convert to float for returning)
    const data = {
      totalIncome: parseFloat(totalIncome._sum.amount || "0"), 
      totalExpense: parseFloat(totalExpense._sum.amount || "0"), 
      totalBudget: parseFloat(totalBudget._sum.amount || "0"), 
      totalBudgetSpend: totalBudgetSpend,
      totalGoalsAmount: parseFloat(totalGoalsAmount._sum.targetAmount || "0"), 
      totalGoalAmountSaved: parseFloat(
        totalGoalAmountSaved._sum.savedAmount || "0"
      ), 
    };

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching data.",
    });
  }
};

module.exports = {
  updateUserData,
  getUserData,
  getAggregatedData,
};
