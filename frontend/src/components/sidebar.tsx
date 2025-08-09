interface Sprops {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}
const models = ["groq", "gemini",];

export default function Sidebar({ selectedModel, onSelectModel }: Sprops) {
  return (
    
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Select Model</h3>

      <div className="flex flex-col space-y-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onSelectModel(model)}
            className={`w-full px-4 py-2 rounded shadow-sm text-left font-medium transition 
              ${
                selectedModel === model
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {model}
          </button>
        ))}
      </div>
    </aside>
  );
}