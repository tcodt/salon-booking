import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === selectedValue)?.label || ""
  );

  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(label);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div
          className="flex items-center justify-between h-12 w-full px-4 py-2 pr-8 text-gray-600 bg-slate-100 rounded-xl cursor-pointer focus:outline-none focus:border-orange-600 outline-2 outline-transparent hover:outline-orange-500 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || label}
          {/* Dropdown Icon */}
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute bottom-14 left-0 z-10 w-full mt-1 bg-white border border-orange-500 rounded-lg shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className={`py-2 px-4 cursor-pointer rounded-lg ${
                  selectedOption === option.label
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-100"
                }`}
                onClick={() => handleOptionClick(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
