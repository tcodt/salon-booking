import React, { useEffect } from "react";

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const htmlElem = document.documentElement;
    const currentTheme = htmlElem.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    htmlElem.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-primary">
      Theme Toggle
    </button>
  );
};

export default ThemeToggle;
