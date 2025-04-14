const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  updateUserData,
  getUserData,
  getAggregatedData,
} = require("../controllers/user.controller");

const express = require("express");

const userRouter = express.Router();

userRouter
  .route("/update-user-data")
  .put(auth, upload.single("profile"), updateUserData);

userRouter.route("/get-user").get(auth, getUserData);

userRouter.route("/get-data").get(auth, getAggregatedData);

module.exports = userRouter;
