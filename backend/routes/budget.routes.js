const express = require("express");
const {
  addBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
} = require("../controllers/budget.controller");
const auth = require("../middleware/auth");

const budgetRouter = express.Router();

budgetRouter.route("/add-budget").post(auth, addBudget);
budgetRouter.route("/update-budget/:id").put(auth, updateBudget);
budgetRouter.route("/:id").delete(auth, deleteBudget);
budgetRouter.route("/get-budgets").get(auth, getAllBudgets);

module.exports = budgetRouter;
