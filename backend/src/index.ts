import axios from "axios";
import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server started");
});

interface frontmsg {
  chatMessage: string;
  model: "gemini" | "groq";
}

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (message: string) => {
    try {
      const data: frontmsg = JSON.parse(message);
      const { chatMessage, model } = data;
      console.log("model :",model, chatMessage)

      if (model === "gemini") {
        const geminiResponse = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
          {
            contents: [{ parts: [{ text: chatMessage }] }],
          },
          {
            headers: {
              "x-goog-api-key": process.env.GEMINI_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const reply =
          geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini";
        socket.send(JSON.stringify({ reply }));

      } else if (model === "groq") {
        const groqResponse = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: chatMessage }],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const reply =
          groqResponse.data?.choices?.[0]?.message?.content ||
          "No response from GROQ";
        socket.send(JSON.stringify({ reply }));

      } else {
        socket.send(JSON.stringify({ reply: "Invalid model selected" }));
      }

    } catch (error: any) {
      console.error("Error:", error.message);
      socket.send(JSON.stringify({ reply: "An error occurred" }));
    }
  });

  socket.on("close", () => {
    console.log("User disconnected");
  });
});
