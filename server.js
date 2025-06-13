const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful AI assistant for Kindred Nutritionals. Answer questions about Kindred Flow’s ingredients and benefits. Be informative but avoid medical claims."
      },
      { role: "user", content: userMessage }
    ]
  });

  res.json({ reply: response.data.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("Kindred bot running on port 3000");
});