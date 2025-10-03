import React from "react";
import { useSidebar } from "../../context/SidebarContext";
import { MdClose, MdMenu } from "react-icons/md";

const SidebarToggleButton: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="text-3xl text-white hover:opacity-50 dark:text-white dark:hover:opacity-50 transition"
      aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
    >
      {isSidebarOpen ? <MdClose /> : <MdMenu />}
    </button>
  );
};

export default SidebarToggleButton;
