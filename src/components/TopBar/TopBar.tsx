import React, { useState } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";
import CustomModal from "../CustomModal/CustomModal";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useThemeColor } from "../../context/ThemeColor";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { logoMap } from "../../utils/logoMap";

const notifications = [
  { title: "رزرو جدید", description: "یک رزرو جدید توسط کاربر ثبت شد." },
  { title: "پرداخت موفق", description: "پرداخت شما با موفقیت انجام شد." },
  {
    title: "یادآوری قرار ملاقات",
    description: "یادآوری: شما فردا یک قرار ملاقات دارید.",
  },
];

const TopBar: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [expandedNotif, setExpandedNotif] = useState<number | null>(null);
  const { themeColor } = useThemeColor();
  const logoSrc = logoMap[themeColor] || "/images/logo-main.jpg";

  return (
    <motion.header
      className={`topbar-motion-fix sticky top-0 z-30 mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-l from-${themeColor}-600 to-${themeColor}-500 px-3 py-2.5 shadow-lg shadow-${themeColor}-500/20 dark:from-${themeColor}-800 dark:to-${themeColor}-700`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Actions */}
      <div className="flex items-center gap-1">
        <SidebarToggleButton />

        <button
          type="button"
          id="theme-toggle"
          onClick={() => setIsSettingOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white/95 transition hover:bg-white/15 active:scale-95"
          aria-label="تنظیمات"
        >
          <IoSettingsOutline size={22} />
        </button>

        <button
          type="button"
          id="notif"
          onClick={() => setIsNotifOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white/95 transition hover:bg-white/15 active:scale-95"
          aria-label="اعلان‌ها"
        >
          <IoNotificationsOutline size={22} />
          <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-400 ring-2 ring-white/30" />
        </button>
      </div>

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="hidden text-left sm:block">
          <p
            className="text-2xl font-bold leading-none text-white"
            style={{ fontFamily: "IranNastaliq, mainFont, sans-serif" }}
          >
            نارژین
          </p>
          <p className="mt-0.5 text-[10px] text-white/70">سالن زیبایی</p>
        </div>
        <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white/40 bg-white/20 shadow-inner">
          <img
            src={logoSrc}
            alt="نارژین"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Settings modal */}
      <CustomModal
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        title="تنظیمات ظاهر"
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              حالت نمایش
            </p>
            <DarkModeToggle />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              رنگ تم
            </p>
            <ColorPicker />
          </div>
        </div>
      </CustomModal>

      {/* Notifications modal */}
      <CustomModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        title="اعلان‌ها"
      >
        <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              اعلانی وجود ندارد
            </p>
          ) : (
            notifications.map((notif, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  setExpandedNotif(expandedNotif === idx ? null : idx)
                }
                className={`rounded-2xl border border-transparent bg-gray-50 p-3 text-right transition hover:border-gray-200 dark:bg-gray-700/60 dark:hover:border-gray-600 border-s-4 border-s-${themeColor}-500`}
              >
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {notif.title}
                </h4>
                <AnimatePresence initial={false}>
                  {expandedNotif === idx && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-1 overflow-hidden text-xs leading-5 text-gray-500 dark:text-gray-400"
                    >
                      {notif.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))
          )}
        </div>
      </CustomModal>
    </motion.header>
  );
};

export default TopBar;