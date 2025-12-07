// components/CodeInput/CodeInput.tsx

import React, { useState, useRef, useEffect } from "react";
import { useThemeColor } from "../../context/ThemeColor";

interface CodeInputProps {
  length?: number; // مثلاً 5
  onComplete: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ length = 5, onComplete }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { themeColor } = useThemeColor();

  // وقتی همه خانه‌ها پر شد، به والد خبر بده
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      onComplete(code.join(""));
    }
  }, [code, onComplete]);

  // وقتی کامپوننت مانت شد، اولین اینپوت فوکوس بشه (مهم!)
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // فقط عدد

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // اگر چیزی وارد کرد و هنوز آخر نرسیده، برو بعدی
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // اگر خالی بود و Backspace زد، برو قبلی و پاکش کن
        inputsRef.current[index - 1]?.focus();
      }
      // در هر صورت مقدار فعلی رو پاک کن
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (pasted.length > 0) {
      const newCode = pasted
        .split("")
        .concat(new Array(length - pasted.length).fill(""));
      setCode(newCode);
      // فوکوس روی آخرین خانه پر شده
      const nextIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center" dir="ltr">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-2xl font-bold rounded-xl border-2 border-${themeColor}-300 focus:border-${themeColor}-500 focus:ring-4 focus:ring-${themeColor}-100 outline-none transition-all`}
          style={{
            fontFeatureSettings: '"liga" 0', // غیرفعال کردن لیگیچر برای اعداد فارسی
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;
