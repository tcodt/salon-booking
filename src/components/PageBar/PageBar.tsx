import React from "react";
import { BsArrowLeft } from "react-icons/bs";

interface PageBarProps {
  title: string;
  handleClick: () => void;
}

const PageBar: React.FC<PageBarProps> = ({ title, handleClick }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-orange-500 font-medium text-2xl">{title}</span>
      <button className="cursor-pointer text-orange-500" onClick={handleClick}>
        <BsArrowLeft size={25} />
      </button>
    </div>
  );
};

export default PageBar;
