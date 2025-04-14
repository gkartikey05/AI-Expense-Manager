const express = require("express");
const auth = require("../middleware/auth");

const {
  addGoal,
  deleteGoal,
  getAllGoals,
  addAmountToGoal,
} = require("../controllers/goal.controller");

const goalRouter = express.Router();

goalRouter.post("/add-goal", auth, addGoal);


goalRouter.delete("/delete-goal/:id", auth, deleteGoal);

goalRouter.get("/get-goals", auth, getAllGoals);

goalRouter.patch("/add-amount/:id", auth, addAmountToGoal);

module.exports = goalRouter;
