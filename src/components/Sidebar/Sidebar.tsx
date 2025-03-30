import React, { useState, useEffect } from "react";
import { FaCut, FaUserTie } from "react-icons/fa";
import { GiBeard } from "react-icons/gi";
import {
  MdClose,
  MdDateRange,
  MdHome,
  MdMenuOpen,
  MdOutlineAccountCircle,
  MdOutlineSpaceDashboard,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { Link } from "react-router";
import { getUserFromStorage } from "../../utils/tokenHelper";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const currentUser = getUserFromStorage();

  // Check if mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        isOpen &&
        isMobile
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: <MdHome size={20} />, label: "صفحه اصلی", path: "/" },
    { icon: <MdDateRange size={20} />, label: "نوبت‌دهی", path: "/booking" },
    { icon: <FaCut size={20} />, label: "خدمات آرایشگاه", path: "/services" },
    { icon: <FaUserTie size={20} />, label: "آرایشگران", path: "/stylists" },
    { icon: <GiBeard size={20} />, label: "محصولات", path: "/products" },
    { icon: <MdPerson size={20} />, label: "پروفایل", path: "/profile" },
    { icon: <MdSettings size={20} />, label: "تنظیمات", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button - Right side for RTL */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 md:hidden m-4 p-2 rounded-l text-gray-800 transition-all duration-300 ${
          isOpen ? "mr-64" : "mr-0"
        }`}
        style={{ right: 0 }} // Position on right for RTL
      >
        {isOpen ? <MdClose size={25} /> : <MdMenuOpen size={25} />}
      </button>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
      )}

      {/* Sidebar - Right positioned for RTL */}
      <div
        id="sidebar"
        className={`fixed z-[2000] h-screen bg-white pb-[160px] border overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-transparent rounded-e-xl shadow-lg transition-all duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
  } ${isMobile ? "w-64" : "w-20 md:w-64"}`}
        style={{ right: 0 }} // Position on right for RTL
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-start p-4 mb-8">
            <div className="bg-orange-600 text-white rounded-lg p-2">
              <MdOutlineSpaceDashboard size={28} />
            </div>
            <span
              className={`mr-3 text-xl font-bold whitespace-nowrap ${
                !isOpen && "hidden md:inline"
              }`}
            >
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
                    className={`flex items-center p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors duration-200 ${
                      !isOpen && "justify-center md:justify-start"
                    }`}
                  >
                    <span className="text-orange-600">{item.icon}</span>
                    <span
                      className={`mr-3 whitespace-nowrap ${
                        !isOpen && "hidden md:inline"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* User Profile */}
          <div
            className={`mt-auto p-3 rounded-lg bg-gray-50 flex items-center ${
              !isOpen && "justify-center md:justify-start"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <MdOutlineAccountCircle className="text-orange-600" size={20} />
            </div>
            <div
              className={`mr-3 overflow-hidden transition-all duration-300 ${
                !isOpen && "hidden md:block"
              }`}
            >
              <p className="text-sm font-medium">{currentUser?.first_name}</p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
