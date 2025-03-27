import React, { useState } from "react";
import { useBookAppointment } from "../../hooks/useBooking";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "zaman";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

const Reserve: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");

  const bookAppointmentMutation = useBookAppointment();

  const handleBooking = () => {
    if (!date || !time || !service) {
      toast.error("لطفا تمام فیلد ها را پر کنید!");
      return;
    }

    const bookingData = {
      date,
      time,
      service: Number(service),
    };

    bookAppointmentMutation.mutate(bookingData, {
      onSuccess: (data) => {
        console.log("Reserve data: ", data);
        toast.success("رزرو شما با موفقیت ثبت شد!");
      },
      onError: (error) => {
        console.log(error);
        toast.error("مشکلی پیش آمد!");
      },
    });
  };

  return (
    <div className="p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-800">صفحه رزرو</h1>

      <div className="mt-8 flex flex-col gap-4">
        <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
          <FaRegCalendarAlt size={25} color="gray" />
          انتخاب تاریخ:
        </label>

        <DatePicker
          onChange={(e) =>
            setDate(
              e.value.toLocaleDateString("fa-IR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            )
          }
          defaultValue={new Date()}
          locale="fa"
          inputClass="border-2 border-orange-500 rounded-xl py-2 px-4 focus:outline-none"
        />

        <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
          <FaRegClock size={25} color="gray" />
          انتخاب ساعت:
        </label>
        <TimePicker
          onChange={(e) => setTime(`${e.hour}:${e.minute}`)}
          defaultValue={new Date()}
          locale="fa"
          inputClass="border-2 border-orange-500 rounded-xl py-2 px-4 focus:outline-none"
        />
      </div>

      <div className="my-8 flex flex-col gap-4">
        {date && <p>📅 تاریخ انتخاب شده: {date}</p>}
        {time && <p>⏰ ساعت انتخاب شده: {time}</p>}
      </div>

      <div className="mb-8">
        <select
          className="mt-4 p-2 border-2 w-full rounded focus:outline-none focus:border-orange-500 transition"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">انتخاب سرویس</option>
          <option value="1">کوتاهی مو</option>
          <option value="2">اصلاح ریش</option>
        </select>
      </div>

      <Button
        type="submit"
        onClick={handleBooking}
        disabled={bookAppointmentMutation.isPending}
      >
        {bookAppointmentMutation.isPending ? "درحال ارسال..." : "ثبت رزرو"}
      </Button>
    </div>
  );
};

export default Reserve;
