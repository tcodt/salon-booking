import React, { useState } from "react";

const CodeInput: React.FC = () => {
  // State برای ذخیره‌سازی مقادیر inputها
  const [code, setCode] = useState<string[]>(["", "", "", ""]);

  // تابع برای به‌روزرسانی مقدار هر input
  const handleInputChange = (index: number, value: string) => {
    // فقط اعداد مجاز هستند
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // اگر عدد وارد شد، به input بعدی فوکوس شود
      if (value && index < 3) {
        document.getElementById(`input-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center space-x-4"
      style={{ direction: "ltr" }}
    >
      {code.map((digit, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          maxLength={1} // فقط یک کاراکتر مجاز است
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="w-10 h-10 text-2xl text-center border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all text-gray-700"
        />
      ))}
    </div>
  );
};

export default CodeInput;
