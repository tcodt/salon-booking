import React from "react";

interface TimeInputProps {
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

const toPersianNumber = (num: number): string =>
  num.toString().replace(/\d/g, (d) => "0123456789"[parseInt(d)]);

const TimeInput: React.FC<TimeInputProps> = ({ hour, minute, onChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 mb-1">ساعت</label>
        <select
          className="border-2 border-orange-500 rounded-xl h-12 px-4 focus:outline-none text-center"
          value={hour}
          onChange={(e) => onChange(parseInt(e.target.value), minute)}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {toPersianNumber(h)}
            </option>
          ))}
        </select>
      </div>
      <span className="text-xl text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 mb-1">دقیقه</label>
        <select
          className="border-2 border-orange-500 rounded-xl h-12 px-4 focus:outline-none text-center"
          value={minute}
          onChange={(e) => onChange(hour, parseInt(e.target.value))}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {toPersianNumber(m)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeInput;
