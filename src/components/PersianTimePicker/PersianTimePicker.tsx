import React, { ReactNode } from "react";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "react-multi-date-picker/styles/layouts/mobile.css";

interface PersianTimePickerType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any, hour: number, minute: number) => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const PersianTimePicker: React.FC<PersianTimePickerType> = ({
  value,
  onChange,
  buttonLabel,
  buttonIcon,
  bgColor,
  textColor,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (val: any) => {
    // console.log("Raw value from picker:", val); // <--- SHOULD see this in console
    if (
      val &&
      typeof val?.hour === "number" &&
      typeof val?.minute === "number"
    ) {
      onChange(val, val.hour, val.minute);
    } else {
      const jsDate = val?.toDate?.() || new Date(val);
      onChange(val, jsDate.getHours(), jsDate.getMinutes());
    }
  };

  return (
    <div>
      <DatePicker
        disableDayPicker
        format="HH:mm"
        render={
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-xl ${bgColor} text-${textColor} text-base font-medium border border-${textColor}`}
          >
            {buttonIcon} {buttonLabel}
          </button>
        }
        className="rmdp-mobile"
        plugins={[<TimePicker hideSeconds />]}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PersianTimePicker;
