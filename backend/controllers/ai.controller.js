const { GoogleGenAI } = require("@google/genai");
const prisma = require("../utils/prisma");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getAiAnalytics = async (req, res) => {
  const userId = req.userId;
  try {
    // Get only fullName, transactions, budget, and goals details of a user
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        transactions: true,
        goals: true,
        budgets: true,
      },
    });

    // Prepare content to be passed to Gemini, structured in a way that can be processed into JSON
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
      You are a helpful and concise financial assistant. Analyze the user's financial data and respond ONLY with a valid JSON object. Do NOT include markdown, comments, or extra explanations and provide personal touch to the user , like you areb directly talking to him.
      
      The JSON response must contain the following fields:
      
      {
        "greeting": "Personalized greeting using the user's name.",
        "summary": "One-paragraph summary of the user's current financial situation.",
        "spendingAnalysis": "Insights based on the user's transactions.",
        "budgetPerformance": "Evaluation of the user's budget adherence and recommendations.",
        "goalProgress": "Assessment of the user's financial goal progress.",
        "nextSteps": "Clear and actionable next steps to improve the user's finances."
      }
      
      User data:
      - Name: ${userData.fullName}
      - Transactions details: ${userData.transactions}
      - Budgets details: ${userData.budgets}
      - Goals details: ${userData.goals}
      
      Use only the provided data to infer insights. If there’s insufficient data, mention that clearly in the relevant fields.
      `,
    });

    let clean = response.text.replace(/```json\n?/, "").replace(/```$/, "");
    // Send the formatted response as JSON
    res.status(200).json({
      success: true,
      analysis: JSON.parse(clean),
    });
  } catch (err) {
    console.log("Error in AI:", err);
    res.status(500).json({ error: "Failed to generate AI analytics" });
  }
};

module.exports = getAiAnalytics;
