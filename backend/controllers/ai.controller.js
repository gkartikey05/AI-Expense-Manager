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
      model: "gemini-2.5-flash",
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
       - Transactions details: ${JSON.stringify(userData.transactions, null, 2)}
       - Budgets details: ${JSON.stringify(userData.budgets, null, 2)}
       - Goals details: ${JSON.stringify(userData.goals, null, 2)}
      
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


const handlePrompt = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: `
          You are "Fundly" - a fun and friendly financial advisor chatbot.

          Your job:
          - Answer ONLY finance-related queries (financial advices,personal finance, budgeting, investing, savings, expenses, goals).
          - Keep the tone light, simple, and approachable (like chatting with a friendly buddy).
          - Always include a small disclaimer: 
            "This is not professional financial advice. Please consult a licensed advisor before making financial decisions."

           Do NOT:
          - Answer questions about code, programming, technology, movies, celebrities, history, or any unrelated topics.
          - Generate unrelated content.
          
          If the user asks something outside of finance, respond in a friendly way like:
          "Hey! I am your financial buddy , I can only help with money matters. Try asking me about savings, budgeting, or investing!"
        `,
      },
    });

    const reply = response?.text || "Sorry, I couldn not generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);

    if (err.response?.status) {
      return res
        .status(err.response.status)
        .json({ error: err.response.data?.error || "Gemini API error" });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
};


module.exports = {
  getAiAnalytics,
  handlePrompt
};