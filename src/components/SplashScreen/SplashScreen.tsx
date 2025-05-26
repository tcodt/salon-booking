import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useThemeColor } from "../../context/ThemeColor";

const SplashScreen: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { themeColor } = useThemeColor();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const navigateTimer = setTimeout(() => {
      if (token) {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, token]);

  return (
    <div
      className={`flex items-center justify-center h-screen bg-gradient-to-r from-${themeColor}-300 to-${themeColor}-500 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src="/logo.png" alt="Logo" className="w-32 h-32" />
    </div>
  );
};

export default SplashScreen;
