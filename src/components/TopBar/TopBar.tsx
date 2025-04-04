import React from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";

const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <SidebarToggleButton />
        <button className="text-gray-500 text-3xl hover:text-orange-500 transition">
          <IoSettingsOutline />
        </button>
        <button className="text-gray-500 text-3xl hover:text-orange-500 transition">
          <IoNotificationsOutline />
        </button>
      </div>
      <div className="p-2 bg-white shadow-md border-2 border-orange-500 rounded-full">
        <img
          src="/logo.png"
          alt="Home Logo"
          className="w-10 h-10 object-contain"
        />
      </div>
    </div>
  );
};

export default TopBar;
