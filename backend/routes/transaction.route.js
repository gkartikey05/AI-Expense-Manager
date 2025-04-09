const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllTransaction,
  deleteTransaction,
  makeTransaction,
  updateTransaction,
} = require("../controllers/transaction.controller");

const transactionRouter = express.Router();

transactionRouter.route("/make-transaction").post(auth, makeTransaction);
transactionRouter.route("/update-transaction").put(auth, updateTransaction);
transactionRouter.route("/get-transactions").get(auth, getAllTransaction);
transactionRouter.route("/:id").delete(auth, deleteTransaction);

module.exports = transactionRouter;
