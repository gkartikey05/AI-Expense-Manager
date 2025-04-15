const express = require("express");
const getAiAnalytics = require("../controllers/ai.controller");
const auth = require("../middleware/auth");

const aiRouter = express.Router();

aiRouter.route("/get-ai-analytics").get(auth, getAiAnalytics);

module.exports = aiRouter;
