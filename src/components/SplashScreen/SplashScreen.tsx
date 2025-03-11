import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const SplashScreen: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const navigateTimer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, isAuthenticated]);

  return (
    <div
      className={`flex items-center justify-center h-screen bg-gradient-to-r from-orange-300 to-orange-500 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src="/logo.png" alt="Logo" className="w-32 h-32" />
    </div>
  );
};

export default SplashScreen;
