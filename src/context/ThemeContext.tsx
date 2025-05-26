// import React, { createContext, useContext, useEffect, useState } from "react";

// interface ThemeContextType {
//   isDarkMode: boolean;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | null>(null);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setIsDarkMode(savedTheme === "dark");
//       document.body.classList.toggle("dark", savedTheme === "dark");
//     }
//   }, []);

//   useEffect(() => {
//     document.body.classList.toggle("dark", isDarkMode);
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     localStorage.setItem("theme", newTheme ? "dark" : "light");
//   };

//   return (
//     <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }

//   return context;
// };
