import React, { ReactNode } from "react";

interface OptionsBoxProps {
  onClick: () => void;
  title: string;
  icon: ReactNode;
  color: string;
}

const OptionsBox: React.FC<OptionsBoxProps> = ({
  onClick,
  title,
  icon,
  color,
}) => {
  return (
    <button
      type="button"
      className={`bg-${color}-100 text-${color}-500 hover:bg-${color}-200 transition rounded-xl py-1 px-3 flex items-center gap-2 border border-${color}-300 dark:bg-${color}-500 dark:text-white dark:border-none dark:hover:bg-${color}-600`}
      onClick={onClick}
    >
      {title} {icon}
    </button>
  );
};

export default OptionsBox;
