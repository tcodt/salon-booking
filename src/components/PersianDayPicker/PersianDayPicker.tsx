import React, { ReactNode } from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

interface PersianDayPickerType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any, weekDay: string, day: number, month: string) => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const PersianDayPicker: React.FC<PersianDayPickerType> = ({
  value,
  onChange,
  buttonLabel,
  buttonIcon,
  bgColor,
  textColor,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (val: any) => {
    onChange(val, val?.weekDay?.name, val?.day, val?.month?.name);
  };

  return (
    <div>
      <DatePicker
        weekDays={weekDays}
        calendar={persian}
        locale={persian_fa}
        render={
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-xl ${bgColor} ${textColor} text-base font-medium`}
          >
            {buttonIcon} {buttonLabel}
          </button>
        }
        className="rmdp-mobile"
        calendarPosition="bottom-left"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PersianDayPicker;
