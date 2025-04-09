const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const transactionRouter = require("./routes/transaction.route");
const budgetRouter = require("./routes/budget.routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// API's
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/budget", budgetRouter);

// listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
