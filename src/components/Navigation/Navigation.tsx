import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";

const Navigation: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
      case "/dashboard/user-profile":
        setValue(0);
        break;
      case "/home":
        setValue(1);
        break;
      case "/reserve":
        setValue(2);
        break;
      default:
        setValue(1);
    }
  }, [location.pathname]);

  useEffect(() => {
    const mainPageForScroll = document.getElementById("mainPageForScroll"); // Select the main element
    if (!mainPageForScroll) return;

    const handleScroll = () => {
      const currentScrollY = mainPageForScroll.scrollTop; // Use scrollTop for the main element
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide navigation on scroll down
      } else {
        setIsVisible(true); // Show navigation on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    mainPageForScroll.addEventListener("scroll", handleScroll);
    return () => {
      mainPageForScroll.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } bg-white shadow-lg`}
    >
      <div className="flex justify-around py-2">
        <button
          onClick={() => {
            setValue(0);
            navigate("/dashboard");
          }}
          className={`flex flex-col items-center ${
            value === 0 ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <FaRegUser size={25} />
          <span className="text-sm">داشبورد</span>
        </button>
        <button
          onClick={() => {
            setValue(1);
            navigate("/home");
          }}
          className={`flex flex-col items-center ${
            value === 1 ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <GrHomeRounded size={25} />
          <span className="text-sm">خانه</span>
        </button>
        <button
          onClick={() => {
            setValue(2);
            navigate("/reserve");
          }}
          className={`flex flex-col items-center ${
            value === 2 ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuNotebookText size={25} />
          <span className="text-sm">رزرو</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
