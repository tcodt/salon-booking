import React from "react";
import { useThemeColor } from "../../context/ThemeColor";

const Dots: React.FC = () => {
  const { themeColor } = useThemeColor();

  return (
    <div className="flex items-center gap-1">
      {/* First Dot */}
      <div
        className={`w-4 h-4 rounded-full bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600 shadow-lg animate-bounce`}
        style={{ animationDelay: "0s" }}
      ></div>

      {/* Second Dot */}
      <div
        className={`w-4 h-4 rounded-full bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600 shadow-lg animate-bounce`}
        style={{ animationDelay: "0.2s" }}
      ></div>

      {/* Third Dot */}
      <div
        className={`w-4 h-4 rounded-full bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600 shadow-lg animate-bounce`}
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default Dots;
