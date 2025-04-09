const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  updateUserData,
  getUserData,
} = require("../controllers/user.controller");

const express = require("express");

const userRouter = express.Router();

userRouter
  .route("/update-user-data")
  .put(auth, upload.single("profile"), updateUserData);

userRouter.route("/get-user").get(auth, getUserData);

module.exports = userRouter;
