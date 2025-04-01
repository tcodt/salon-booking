import React, { useState } from "react";
import {
  useBookAppointment,
  useEmployees,
  useServices,
} from "../../hooks/useBooking";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "zaman";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { getUserFromStorage } from "../../utils/tokenHelper";

const Reserve: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    null
  );
  const [services, setServices] = useState<number | null>(null);
  const [employee, setEmployee] = useState<number | null>(null);
  const status: string = "pending";

  const { data: servicesData = [] } = useServices();
  const { data: employeesData = [] } = useEmployees();

  const currentUser = getUserFromStorage();

  const bookAppointmentMutation = useBookAppointment();

  const handleBooking = () => {
    if (!date || !time || !services) {
      toast.error("لطفا تمام فیلد ها را پر کنید!");
      return;
    }

    // Convert date to ISO format (YYYY-MM-DD)
    const formattedDate = date.toISOString().split("T")[0];

    // Convert time to "HH:MM:SS" format
    const formattedTime = `${String(time.hour).padStart(2, "0")}:${String(
      time.minute
    ).padStart(2, "0")}:00`;

    const bookingData = {
      date: formattedDate,
      time: formattedTime,
      service_id: Number(services),
      status: status,
      user: currentUser?.id,
      employee_id: Number(employee),
    };

    console.log("Sending Booking Data:", bookingData); // Debugging

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
    <div
      className="p-4 h-screen w-screen overflow-y-auto pb-[160px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-transparent"
    >
      <h2 className="text-2xl font-bold text-gray-800 pb-8">
        همین حالا رزرو کن!
      </h2>
      <hr />
      <div className="mt-8 flex flex-col gap-4">
        <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
          <FaRegCalendarAlt size={25} color="gray" />
          انتخاب تاریخ:
        </label>

        <DatePicker
          onChange={(e) => setDate(e.value)}
          defaultValue={new Date()}
          locale="fa"
          inputClass="border-2 border-orange-500 rounded-xl h-12 px-4 focus:outline-none"
        />

        <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
          <FaRegClock size={25} color="gray" />
          انتخاب ساعت:
        </label>
        <TimePicker
          onChange={(e) => setTime({ hour: e.hour, minute: e.minute })}
          defaultValue={new Date()}
          locale="fa"
          inputClass="border-2 border-orange-500 rounded-xl h-12 px-4 focus:outline-none"
        />
      </div>

      <div className="my-8 flex flex-col gap-4">
        {date && <p>📅 تاریخ انتخاب شده: {date.toLocaleDateString("fa-IR")}</p>}
        {time && (
          <p>
            ⏰ ساعت انتخاب شده:{" "}
            {`${String(time.hour).padStart(2, "0")}:${String(
              time.minute
            ).padStart(2, "0")}:00`}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 my-10">
        <div>
          <select
            className="h-12 px-4 border-2 w-full rounded-xl focus:outline-none border-orange-500 transition"
            value={services || ""}
            onChange={(e) => setServices(Number(e.target.value) || null)}
            required
          >
            <option value="">انتخاب سرویس</option>
            {servicesData?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="h-12 px-4 border-2 w-full rounded-xl focus:outline-none border-orange-500 transition"
            value={employee || ""}
            onChange={(e) => setEmployee(Number(e.target.value) || null)}
          >
            <option value="">لطفاً کارمند را انتخاب کنید</option>
            {employeesData?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.skill}
              </option>
            ))}
          </select>
        </div>
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
