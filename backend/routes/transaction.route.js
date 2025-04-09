const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllTransaction,
  makeOrUpdateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const transactionRouter = express.Router();

transactionRouter
  .route("/make-transaction")
  .post(auth, makeOrUpdateTransaction);

transactionRouter.route("/get-transactions").get(auth, getAllTransaction);
transactionRouter.route("/:id").delete(auth, deleteTransaction);

module.exports = transactionRouter;
