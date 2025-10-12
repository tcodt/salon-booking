import React, { useState } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";
import CustomModal from "../CustomModal/CustomModal";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useThemeColor } from "../../context/ThemeColor";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { motion } from "framer-motion";
import { logoMap } from "../../utils/logoMap";

const TopBar: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [expandedNotif, setExpandedNotif] = useState<number | null>(null);
  const { themeColor } = useThemeColor();

  const logoSrc = logoMap[themeColor] || "/images/logo-main.jpg";

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
    <motion.div
      className={`flex items-center justify-between mb-4 bg-${themeColor}-500 dark:bg-${themeColor}-700 p-4 rounded-3xl`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex items-center gap-4">
        <SidebarToggleButton />
        <button
          className={`text-white dark:text-white text-3xl hover:opacity-50 transition`}
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
          className={`text-white dark:text-white text-3xl hover:opacity-50 transition`}
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
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "IranNastaliq" }}
        >
          نارژین
        </h3>
        <motion.div
          className={` bg-${themeColor}-200 shadow-md border-2 border-${themeColor}-300 rounded-full w-14 h-14`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1.1, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 5,
            ease: "easeOut",
          }}
        >
          <img
            src={logoSrc}
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopBar;
