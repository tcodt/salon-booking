import { AnimatePresence, motion } from "framer-motion";

// interface DropdownProps {

import React, { useEffect, useRef, useState } from "react";
import { dropdownMenuVariant } from "../../utils/variants";
import OptionsBox from "../OptionsBox/OptionsBox";
import { IoPersonAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaTrashCan } from "react-icons/fa6";
import { useThemeColor } from "../../context/ThemeColor";
import { MdOutlineModeEdit } from "react-icons/md";

interface DropdownProps {
  isAddOpen?: boolean;
  setIsAddOpen: (value: boolean) => void;
  isUpdateOpen?: boolean;
  setIsUpdateOpen: (value: boolean) => void;
  isDeleteOpen?: boolean;
  setIsDeleteOpen: (value: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  setIsAddOpen,
  setIsUpdateOpen,
  setIsDeleteOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const { themeColor } = useThemeColor();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex" ref={boxRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`text-gray-100 dark:text-white flex items-center gap-2 cursor-pointer bg-${themeColor}-500 p-3 rounded-full`}
      >
        <MdOutlineModeEdit size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownMenuVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            role="menu"
            className={`absolute end-0 top-12 z-[999] w-56 overflow-hidden shadow bg-${themeColor}-500`}
          >
            <div>
              <OptionsBox
                onClick={() => {
                  setIsAddOpen(true);
                  setIsOpen(false);
                }}
                icon={<IoPersonAdd />}
                title="افزودن"
              />
              <OptionsBox
                onClick={() => {
                  setIsUpdateOpen(true);
                  setIsOpen(false);
                }}
                icon={<RxUpdate />}
                title="بروزرسانی"
              />
              <OptionsBox
                onClick={() => {
                  setIsDeleteOpen(true);
                  setIsOpen(false);
                }}
                icon={<FaTrashCan />}
                title="حذف"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
