
import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/messages"; 

interface ChatWindowProps {
  selectedModel: string;
}

export default function ChatWindow({ selectedModel }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMessage: Message = {
        type: "bot",
        text: data.reply,
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage: Message = { type: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);

  if (
    socketRef.current &&
    socketRef.current.readyState === WebSocket.OPEN
  ) {
    socketRef.current.send(
      JSON.stringify({ chatMessage: input, model: selectedModel })
    );
  } else {
    console.warn("WebSocket not open. Current state:", socketRef.current?.readyState);
  
  }

  setInput("");
};

  return (
    <div className="ml-64 pt-16 h-[calc(100vh-4rem)] flex flex-col">

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-md px-4 py-2 rounded-lg ${
              msg.type === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

    
      <div className="p-4 bg-white dark:bg-gray-900 flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
