import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRedirectHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <p className="text-lg font-semibold mb-4 dark:text-white">
        آیا مطمئن هستید که می‌خواهید خارج شوید؟
      </p>
      <div className="flex items-center gap-4 w-full">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full transition"
          onClick={handleLogout}
        >
          بله
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 w-full transition"
          onClick={handleRedirectHome}
        >
          خیر
        </button>
      </div>
    </div>
  );
};
export default Logout;
