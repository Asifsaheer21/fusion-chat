
🔄 Real-Time AI Model Switcher – Gemini & Groq
A beginner-friendly real-time AI chat app where you can switch between AI models (Google Gemini and xAI's Groq) instantly using WebSockets.
Built to learn how WebSockets work with a modern React + TypeScript frontend and an Express.js backend.

🚀 Features
Live Model Switching – Switch between Gemini and Groq without refreshing.

WebSocket Communication – Instant, persistent connection between client and server.

React + TypeScript Frontend – Clean, type-safe UI code.

Express.js Backend – Handles AI API requests and model selection.

Beginner-Friendly – Easy to follow and expand.

🛠️ Tech Stack
Frontend
React (TypeScript)

Tailwind CSS

WebSocket client

Backend
Node.js / Express

WebSocket (ws)

Axios

dotenv & cors

APIs
Google Gemini API

xAI Groq API

📦 Installation
1️⃣ Clone the Repository

git clone https://github.com/yourusername/real-time-ai-switcher.git
cd real-time-ai-switcher
2️⃣ Backend Setup

cd backend
npm install
Create a .env file:


GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

npm run dev
3️⃣ Frontend Setup

cd frontend
npm install
npm start

💡 How It Works
The frontend connects to the backend via WebSockets.

User selects Gemini or Groq and sends a chat message.

The backend routes the request to the selected AI API.

The AI's reply is sent back through the WebSocket and displayed instantly.

📂 Project Structure

/backend
  ├── index.ts        # WebSocket server + API calls
  ├── package.json
  └── .env
/frontend
  ├── src
  │   ├── App.tsx     # Main chat UI
  │   ├── Sidebar.tsx # Model selection
  │   └── ...
  ├── package.json


🔮 Future Improvements
Add more AI models (Claude, GPT-4o, etc.)

Show typing indicators & streaming responses

Store chat history

Deploy online with Vercel + Render

