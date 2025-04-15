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
const goalRouter = require("./routes/goal.routes");
const aiRouter = require("./routes/aiAnalytics.router");

const app = express();
const PORT = process.env.PORT || 4000;

// Global middlewares

// cors options
const options = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// API's
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/goal", goalRouter);
app.use("/api/ai", aiRouter);

// listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
