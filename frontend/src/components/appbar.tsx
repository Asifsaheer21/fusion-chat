// export default function Appbar() {
//   return (
//     <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md dark:bg-gray-900">
//       <div className="px-4 py-4 mx-auto max-w-4xl flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
//           Fusion Chat
//         </h2>

//         <div className="flex items-center space-x-4">
//           <span className="text-md text-gray-600 dark:text-gray-300">
//             LLM chat playground
//           </span>

//           <button
//             onClick={() => {
//               document.documentElement.classList.toggle("dark");
//             }}
//             className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
//           >
//              Theme
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
import { useEffect, useState } from "react";

export default function Appbar() {
  const [isDark, setIsDark] = useState(false);

  // On first load, check if dark mode is active
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md dark:bg-gray-900">
      <div className="px-4 py-4 mx-auto max-w-4xl flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          Fusion Chat
        </h2>

        <div className="flex items-center space-x-4">
          <span className="text-md text-gray-600 dark:text-gray-300">
            LLM chat playground
          </span>

          <button
            onClick={toggleTheme}
            className="px-3 py-1"
          >
            {isDark ? "🌙 " : "☀️ "}
          </button>
        </div>
      </div>
    </header>
  );
}
