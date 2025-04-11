import React from "react";

interface TimeInputProps {
  value: string;
  onChange: (newTime: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;

    // Match 00:00:00 format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;

    if (time === "" || timeRegex.test(time)) {
      onChange(time);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="00:00:00"
      className="primary-input"
      dir="ltr"
    />
  );
};

export default TimeInput;
