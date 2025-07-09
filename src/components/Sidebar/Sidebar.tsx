import React, { useEffect } from "react";
import { FaUsers, FaUserTie, FaWallet } from "react-icons/fa";
import { GiBeard } from "react-icons/gi";
import {
  MdHome,
  MdOutlineAccountCircle,
  MdOutlineSpaceDashboard,
  MdPerson,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import { HiClipboardList } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { FaSliders } from "react-icons/fa6";
import { useThemeColor } from "../../context/ThemeColor";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { themeColor } = useThemeColor();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location, setIsSidebarOpen]);

  const navItems = [
    { icon: <MdHome size={20} />, label: "صفحه اصلی", path: "/" },
    {
      icon: <FaUsers size={20} />,
      label: "مدیریت کارمندان",
      path: "/manage-employees",
    },
    {
      icon: <MdSpaceDashboard size={20} />,
      label: "خدمات آرایشگاه",
      path: "/manage-services",
    },
    {
      icon: <HiClipboardList size={20} />,
      label: "لیست رزرو ها",
      path: "/appointments-list",
    },
    // { icon: <MdTimer size={20} />, label: "ساعات کاری", path: "/working-time" },
    {
      icon: <FaSliders size={20} />,
      label: "اسلایدر",
      path: "/sliders",
    },
    { icon: <GiBeard size={20} />, label: "پکیج ها", path: "/packages" },
    { icon: <FaUserTie size={20} />, label: "آرایشگران", path: "/stylists" },
    { icon: <MdPerson size={20} />, label: "پروفایل", path: "/user-profile" },
    { icon: <MdSettings size={20} />, label: "تنظیمات", path: "/settings" },
    { icon: <FaWallet size={20} />, label: "کیف پول", path: "/wallet" },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)} // Ensure overlay click closes sidebar
        />
      )}

      <div
        id="sidebar"
        className={`fixed top-0 right-0 z-[2000] h-screen w-64 bg-white dark:bg-gray-800 border-e border-gray-300 dark:border-e-gray-500 
          overflow-y-auto -webkit-overflow-scrolling-touch
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          rounded-e-xl shadow-lg transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-4 pb-8">
          <div className="flex items-center justify-start p-4 mb-8">
            <div className={`bg-${themeColor}-600 text-white rounded-lg p-2`}>
              <MdOutlineSpaceDashboard size={28} />
            </div>
            <span className="mr-3 text-xl font-bold whitespace-nowrap text-gray-800 dark:text-white">
              آرایشگاه من
            </span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg hover:bg-${themeColor}-50 text-gray-700 hover:text-${themeColor}-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-${themeColor}-500 dark:hover:bg-transparent`}
                  >
                    <span className={`text-${themeColor}-600`}>
                      {item.icon}
                    </span>
                    <span className="mr-3 whitespace-nowrap">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto mb-2 p-3 rounded-lg bg-red-100 dark:bg-red-500 flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
              <IoLogOut className="text-red-600" size={20} />
            </div>
            <div className="mr-3 overflow-hidden">
              <button
                className="cursor-pointer text-sm font-medium text-gray-700 dark:text-white"
                onClick={() => navigate("/logout")}
              >
                خروج
              </button>
            </div>
          </div>

          <div className="mt-auto p-3 rounded-lg bg-gray-100 dark:bg-gray-500 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <MdOutlineAccountCircle className="text-gray-600" size={20} />
            </div>
            <div className="mr-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-700 dark:text-white">
                {user?.first_name}
              </p>
              <p className="text-xs text-gray-500 truncate dark:text-gray-200">
                {user?.phone_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
