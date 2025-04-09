const prisma = require("../utils/prisma");
const { transactionSchema } = require("../utils/zodSchema");

// ---------------make or transaction----------------
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

// ---------------get all transaction---------------
const getAllTransaction = async (req, res) => {
  const userId = req.userId;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });

    if (!transactions.length) {
      return res.status(404).json({
        success: false,
        message: "No transactions yet",
      });
    }

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (err) {
    console.log("error:", err);
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
