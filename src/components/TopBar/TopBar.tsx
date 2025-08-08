import React, { useState } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";
import CustomModal from "../CustomModal/CustomModal";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useThemeColor } from "../../context/ThemeColor";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const TopBar: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [expandedNotif, setExpandedNotif] = useState<number | null>(null);
  const { themeColor } = useThemeColor();

  const notifications = [
    {
      title: "رزرو جدید",
      description: "یک رزرو جدید توسط کاربر ثبت شد.",
    },
    {
      title: "پرداخت موفق",
      description: "پرداخت شما با موفقیت انجام شد.",
    },
    {
      title: "یادآوری قرار ملاقات",
      description: "یادآوری: شما فردا یک قرار ملاقات دارید.",
    },
    {
      title: "لغو رزرو",
      description: "رزرو شما با موفقیت لغو شد.",
    },
    {
      title: "به‌روزرسانی پروفایل",
      description: "اطلاعات پروفایل شما با موفقیت به‌روزرسانی شد.",
    },
  ];

  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <SidebarToggleButton />
        <button
          className={`text-gray-500 dark:text-white dark:hover:text-${themeColor}-500 text-3xl hover:text-${themeColor}-500 transition`}
          onClick={() => setIsSettingOpen(true)}
        >
          <IoSettingsOutline />
        </button>

        <CustomModal
          isOpen={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
          title="تنظیمات"
        >
          <DarkModeToggle />
          <ColorPicker />
        </CustomModal>

        <button
          className={`text-gray-500 dark:text-white dark:hover:text-${themeColor}-500 text-3xl hover:text-${themeColor}-500 transition`}
          onClick={() => setIsNotifOpen(true)}
        >
          <IoNotificationsOutline />
        </button>

        <CustomModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          title="اعلان ها"
        >
          <div className="flex flex-col gap-4">
            {notifications?.map((notif, idx) => (
              <div
                key={idx}
                className={`flex flex-col relative border-s-2 border-s-${themeColor}-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md`}
                onClick={() =>
                  setExpandedNotif(expandedNotif === idx ? null : idx)
                }
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-gray-700 text-base font-medium dark:text-gray-200">
                  {notif.title}
                </h4>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedNotif === idx
                      ? "max-h-40 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
                    {notif.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CustomModal>
      </div>
      <div className="flex items-center gap-2">
        <h3
          className={`text-4xl font-bold text-${themeColor}-500`}
          style={{ fontFamily: "IranNastaliq" }}
        >
          نارژین
        </h3>
        <div
          className={` bg-white shadow-md border-2 border-${themeColor}-500 rounded-full w-14 h-14`}
        >
          <img
            src="/images/logo-main.png"
            alt="Home Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
