import React, { useEffect } from "react";
import { FaCut, FaUsers, FaUserTie } from "react-icons/fa";
import { GiBeard } from "react-icons/gi";
import {
  MdHome,
  MdOutlineAccountCircle,
  MdOutlineSpaceDashboard,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import { LuClipboardList } from "react-icons/lu";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const location = useLocation();

  // Close sidebar when clicking outside
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

  // Close sidebar when route changes
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
      icon: <LuClipboardList size={20} />,
      label: "لیست رزرو ها",
      path: "/appointments-list",
    },
    { icon: <FaCut size={20} />, label: "خدمات آرایشگاه", path: "/services" },
    { icon: <FaUserTie size={20} />, label: "آرایشگران", path: "/stylists" },
    { icon: <GiBeard size={20} />, label: "محصولات", path: "/products" },
    {
      icon: <MdPerson size={20} />,
      label: "پروفایل",
      path: "/user-profile",
    },
    {
      icon: <MdSettings size={20} />,
      label: "تنظیمات",
      path: "/settings",
    },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
      )}

      {/* Sidebar - Right positioned for RTL */}
      <div
        id="sidebar"
        className={`fixed bottom-0 right-0 z-[2000] h-[95%] w-64 bg-white border overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-transparent rounded-e-xl shadow-lg transition-transform duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
        style={{ right: 0 }} // Position on right for RTL
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-start p-4 mb-8">
            <div className="bg-orange-600 text-white rounded-lg p-2">
              <MdOutlineSpaceDashboard size={28} />
            </div>
            <span className="mr-3 text-xl font-bold whitespace-nowrap">
              آرایشگاه من
            </span>
          </div>
          {/* Navigation Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors duration-200"
                  >
                    <span className="text-orange-600">{item.icon}</span>
                    <span className="mr-3 whitespace-nowrap">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* User Profile */}
          <div className="mt-auto p-3 rounded-lg bg-gray-50 flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <MdOutlineAccountCircle className="text-orange-600" size={20} />
            </div>
            <div className="mr-3 overflow-hidden">
              <p className="text-sm font-medium">{user?.first_name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
