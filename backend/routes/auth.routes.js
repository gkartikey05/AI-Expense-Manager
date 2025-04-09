const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.route("/register").post(registerController);
authRouter.route("/login").post(loginController);
authRouter.route("/logout").post(logoutController);

module.exports = authRouter;
