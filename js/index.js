const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/chat", (req, res) => {
  const chat = req.body.chat; // e.g., "What is 2 + 2?"

  axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: chat
            }
          ]
        }
      ]
    },
    {
      headers: {
        "x-goog-api-key": "AIzaSyCvlL-GwpJQsLtvEjkyZKNTrX8Q8wSf8gs"
      }
    }
  ).then(response => {
    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  }).catch(error => {
    console.error("Error from Gemini API:", error.message);
    res.status(500).json({ reply: "Something went wrong!" });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
