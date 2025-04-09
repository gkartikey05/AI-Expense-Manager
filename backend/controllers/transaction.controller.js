const prisma = require("../utils/prisma");
const { transactionSchema } = require("../utils/zodSchema");

// ---------------make or update transaction----------------
const makeOrUpdateTransaction = async (req, res) => {
  const userId = req.userId;
  try {
    const result = transactionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map((issue) => issue.message),
      });
    }

    const { transactionId } = req.body;

    let transaction;

    if (transactionId) {
      // Update
      transaction = await prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          ...result.data,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Transaction updated",
        transaction,
      });
    } else {
      // Create
      transaction = await prisma.transaction.create({
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
    }
  } catch (err) {
    console.log("error:", err);
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
  makeOrUpdateTransaction,
  getAllTransaction,
  deleteTransaction,
};
