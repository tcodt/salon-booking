// src/components/ColorPicker.tsx
import { useState } from "react";
import { useThemeColor } from "../../context/ThemeColor";
import { IoIosColorPalette } from "react-icons/io";

const colorOptions = [
  "blue",
  "red",
  "green",
  "purple",
  "yellow",
  "orange",
  "primary-green",
];

const ColorPicker = () => {
  const { themeColor, setThemeColor } = useThemeColor();
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color: string) => {
    setThemeColor(color);
    setIsOpen(false); // Close the color picker after selection
  };

  return (
    <div className="relative">
      {/* Settings Icon to toggle color picker */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-full hover:bg-gray-300 mb-4 transition"
        aria-label="Open color picker"
      >
        <IoIosColorPalette className={`w-6 h-6 text-${themeColor}-500`} />
      </button>

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="mt-4 pb-4">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2">
            رنگ تم را انتخاب کنید
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 bg-${color}-500 rounded-full hover:scale-110 transition-transform`}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
      )}
      <hr />
      <div className="text-gray-600 dark:text-gray-300 mt-4 flex items-center gap-4">
        تم فعلی:{" "}
        <div className={`w-6 h-6 bg-${themeColor}-500 rounded-full`}></div>
      </div>
    </div>
  );
};

export default ColorPicker;
