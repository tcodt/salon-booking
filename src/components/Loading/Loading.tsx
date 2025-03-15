import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center gap-1">
        {/* First Dot */}
        <div
          className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>

        {/* Second Dot */}
        <div
          className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>

        {/* Third Dot */}
        <div
          className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
