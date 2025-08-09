import './App.css'
import Appbar from './components/appbar'
import Sidebar from './components/sidebar'
import ChatWindow from './components/chat';

import { useState } from "react";

export default function App() {
  const [selectedModel, setSelectedModel] = useState("gemini");

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">
      <Appbar />
      <Sidebar selectedModel={selectedModel} onSelectModel={setSelectedModel} />
      <ChatWindow selectedModel={selectedModel} />
    </div>
  );
}