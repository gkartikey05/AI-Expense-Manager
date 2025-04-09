const express = require("express");
const auth = require("../middleware/auth");

const {
  addGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
  addAmountToGoal,
} = require("../controllers/goal.controller");

const goalRouter = express.Router();

goalRouter.post("/add-goal", auth, addGoal);

goalRouter.put("/update-goal/:goalId", auth, updateGoal);

goalRouter.delete("/delete-goal/:goalId", auth, deleteGoal);

goalRouter.get("/my-goals", auth, getAllGoals);

goalRouter.patch("/add-amount/:goalId", auth, addAmountToGoal);

module.exports = goalRouter;
