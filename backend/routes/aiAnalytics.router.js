const express = require("express");
const getAiAnalytics = require("../controllers/ai.controller");
const auth = require("../middleware/auth");
const handlePrompt = require("../controllers/ai.controller");

const aiRouter = express.Router();

aiRouter.route("/get-ai-analytics").get(auth, getAiAnalytics);
aiRouter.route("/handle-prompt").post(auth, handlePrompt);

module.exports = aiRouter;
