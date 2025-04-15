const prisma = require("../utils/prisma");
const { transactionSchema } = require("../utils/zodSchema");

// ---------------make  transaction----------------
const makeTransaction = async (req, res) => {
  const userId = req.userId;
  try {
    const result = transactionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        ...result.data,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Transaction saved",
      transaction,
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// -------------update transaction------------------
const updateTransaction = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;

  try {
    const result = transactionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    // Check if transaction exists for this user
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Update
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: result.data,
    });

    return res.status(200).json({
      success: true,
      message: "Transaction updated",
      transaction: updatedTransaction,
    });
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// --------------get all transcation of a user based on filters-----------------
const getAllTransaction = async (req, res) => {
  const userId = req.userId;
  const filter = req.query.filter;
  const sort = req.query.sort;
  const search = req.query.search?.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const today = new Date();
  const filterObject = {
    userId,
  };

  // Filter by type
  if (filter === "income") filterObject.type = "INCOME";
  if (filter === "expense") filterObject.type = "EXPENSE";

  // Date Filters
  if (filter === "week") {
    const day = today.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    filterObject.date = {
      gte: startOfWeek,
      lte: endOfWeek,
    };
  }

  if (filter === "thisMonth") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    filterObject.date = {
      gte: startOfMonth,
      lte: endOfMonth,
    };
  }

  if (filter === "lastMonth") {
    const lastMonth =
      today.getMonth() === 0
        ? new Date(today.getFullYear() - 1, 11, 1)
        : new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const startOfLastMonth = new Date(lastMonth);
    const endOfLastMonth = new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth() + 1,
      0
    );
    endOfLastMonth.setHours(23, 59, 59, 999);

    filterObject.date = {
      gte: startOfLastMonth,
      lte: endOfLastMonth,
    };
  }

  // search by description
  if (search) {
    filterObject.description = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Sorting
  let orderBy = {};
  switch (sort) {
    case "dateNewest":
      orderBy = { date: "desc" };
      break;
    case "dateOldest":
      orderBy = { date: "asc" };
      break;
    case "amountHighToLow":
      orderBy = { amount: "desc" };
      break;
    case "amountLowToHigh":
      orderBy = { amount: "asc" };
      break;
    case "descriptionAZ":
      orderBy = { description: "asc" };
      break;
    default:
      orderBy = { date: "desc" };
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filterObject,
      orderBy,
      skip,
      take: limit,
    });

    const total = await prisma.transaction.count({
      where: filterObject,
    });

    if (transactions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No transactions found!",
        transactions: [],
      });
    }

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTransactions: total,
      transactions,
    });
  } catch (err) {
    console.error("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ----------delete transaction-------------------
const deleteTransaction = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    // Check if the transaction exists
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Delete the transaction
    await prisma.transaction.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  makeTransaction,
  updateTransaction,
  getAllTransaction,
  deleteTransaction,
};
