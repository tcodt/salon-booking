import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
// import { useState } from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Icon from "react-multi-date-picker/components/icon";
import "react-multi-date-picker/styles/layouts/mobile.css";

interface Props {
  onTimeSelect: (time: string) => void;
  selectedDate?: string;
}

const TimePickerPersian: React.FC<Props> = ({ onTimeSelect, selectedDate }) => {
  //   const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTimeChange = (time: any) => {
    if (time) {
      const formattedTime = time?.format("HH:mm:ss");
      //   setSelectedTime(formattedTime);
      onTimeSelect(formattedTime);
    }
  };

  return (
    <div className="bg-orange-500 p-2 rounded-xl">
      <label className="block text-zinc-200 font-medium">انتخاب ساعت:</label>
      <DatePicker
        disableDayPicker
        //   value={selectedTime}
        locale={persian_fa}
        calendar={persian}
        format="HH:mm:ss A"
        render={<Icon />}
        className="rmdp-mobile"
        plugins={[<TimePicker position="bottom" />]}
        onChange={handleTimeChange}
        disabled={!selectedDate}
      />
    </div>
  );
};

export default TimePickerPersian;
