import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { LuCircleAlert, LuLogOut } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-md">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-full">
              <LuCircleAlert
                className="w-14 h-14 text-amber-500 dark:text-amber-400"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              خروج از حساب
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              آیا از خروج خود اطمینان دارید؟
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-xl transition-colors duration-200 shadow-sm shadow-red-600/20 hover:shadow-red-600/30"
            >
              <LuLogOut className="w-4 h-4" />
              بله، خارج می‌شوم
            </button>

            <button
              onClick={handleRedirectHome}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-colors duration-200"
            >
              <FaArrowLeft className="w-4 h-4" />
              نه، بازگشت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
