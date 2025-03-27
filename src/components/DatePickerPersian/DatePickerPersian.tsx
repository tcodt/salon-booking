import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import Icon from "react-multi-date-picker/components/icon";
import "react-multi-date-picker/styles/layouts/mobile.css";

interface Props {
  onDateSelect: (date: string) => void;
}

const DatePickerPersian: React.FC<Props> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any) => {
    if (date) {
      const formattedDate = date?.format("YYYY-MM-DD"); // تبدیل به فرمت مناسب
      setSelectedDate(formattedDate);
      onDateSelect(formattedDate);
    }
  };

  return (
    <div className="bg-orange-500 p-2 rounded-xl text-white">
      <label className="block text-zinc-200 font-medium">انتخاب تاریخ:</label>
      <DatePicker
        value={selectedDate}
        calendar={persian}
        locale={persian_fa}
        format="YYYY-MM-DD"
        render={<Icon />}
        className="rmdp-mobile"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePickerPersian;
