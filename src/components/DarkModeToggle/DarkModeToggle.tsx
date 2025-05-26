import React, { useEffect, useState } from "react";
import { AiFillSun } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";

const getInitialDark = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("darkMode");
    if (saved) return saved === "enabled";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(getInitialDark);

  // Add/remove dark class & save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "not-enabled");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-full hover:bg-gray-300 mb-4 transition"
    >
      {isDark ? (
        <AiFillSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <BsMoonStarsFill className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
};

export default DarkModeToggle;
