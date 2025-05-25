import React, { useState } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";
import CustomModal from "../CustomModal/CustomModal";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useThemeColor } from "../../context/ThemeColor";

const TopBar: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const { themeColor } = useThemeColor();

  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <SidebarToggleButton />
        <button
          className={`text-gray-500 text-3xl hover:text-${themeColor}-500 transition`}
          onClick={() => setIsSettingOpen(true)}
        >
          <IoSettingsOutline />
        </button>

        <CustomModal
          isOpen={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
          title="تنظیمات"
        >
          <ColorPicker />
        </CustomModal>

        <button
          className={`text-gray-500 text-3xl hover:text-${themeColor}-500 transition`}
        >
          <IoNotificationsOutline />
        </button>
      </div>
      <div
        className={`p-2 bg-white shadow-md border-2 border-${themeColor}-500 rounded-full`}
      >
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
