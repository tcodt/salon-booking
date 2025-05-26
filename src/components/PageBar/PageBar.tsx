import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useThemeColor } from "../../context/ThemeColor";

interface PageBarProps {
  title: string;
  handleClick?: () => void;
}

const PageBar: React.FC<PageBarProps> = ({ title, handleClick }) => {
  const { themeColor } = useThemeColor();

  return (
    <div className="flex items-center justify-between">
      <span className={`text-${themeColor}-500 font-medium text-2xl`}>
        {title}
      </span>
      {handleClick && (
        <button
          className={`cursor-pointer text-${themeColor}-500`}
          onClick={handleClick}
        >
          <BsArrowLeft size={25} />
        </button>
      )}
    </div>
  );
};

export default PageBar;
