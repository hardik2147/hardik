const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI("AIzaSyCpp8qBnhydjxpGScdaAm2BGXh3xHDw8h0"); // Your Gemini API Key

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "⚠️ Error contacting Gemini API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Gemini chatbot server running on port ${PORT}`);
});
