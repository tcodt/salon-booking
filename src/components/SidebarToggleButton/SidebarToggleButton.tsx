import React from "react";
import { useSidebar } from "../../context/SidebarContext";
import { MdClose, MdMenu } from "react-icons/md";
import { useThemeColor } from "../../context/ThemeColor";

const SidebarToggleButton: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { themeColor } = useThemeColor();

  return (
    <button
      onClick={toggleSidebar}
      className={`text-3xl text-gray-500 hover:text-${themeColor}-500 transition-colors`}
      aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
    >
      {isSidebarOpen ? <MdClose /> : <MdMenu />}
    </button>
  );
};

export default SidebarToggleButton;
