import React, { useState } from "react";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
// import { DatePicker, TimePicker } from "zaman";
// import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { useAddAppointment } from "../../hooks/appointments/useAddAppointment";
import { useGetServices } from "../../hooks/services/useGetServices";
import { useGetEmployees } from "../../hooks/employees/useGetEmployees";
import { useNavigate } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";
import { useGetSlots } from "../../hooks/slots/useGetSlots";
import { LuCalendarClock } from "react-icons/lu";

const Reserve: React.FC = () => {
  // const [date, setDate] = useState<Date | null>(new Date());
  // const [time, setTime] = useState<{ hour: number; minute: number } | null>(
  //   null
  // );
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [services, setServices] = useState<number | null>(null);
  const [employee, setEmployee] = useState<number | null>(null);
  const status: string = "pending";
  const navigate = useNavigate();

  const { data: servicesData = [] } = useGetServices();
  const { data: employeesData = [] } = useGetEmployees();
  const { data: slots } = useGetSlots();
  const queryClient = useQueryClient();

  const addAppointmentMutation = useAddAppointment();
  const { themeColor } = useThemeColor();

  const handleBooking = () => {
    if (!selectedSlotId || !services || !employee) {
      toast.error("لطفا تمام فیلد ها را پر کنید!");
      return;
    }

    const bookingData = {
      service_id: Number(services),
      status: status,
      employee_id: Number(employee),
      time_slot_id: selectedSlotId,
    };

    addAppointmentMutation.mutate(bookingData, {
      onSuccess: () => {
        toast.success("رزرو شما با موفقیت ثبت شد!");
        queryClient.invalidateQueries({
          queryKey: ["appointments"],
        });
        navigate("/appointments-list");
      },
      onError: (error) => {
        console.log(error);
        toast.error("مشکلی پیش آمد!");
      },
    });
  };

  return (
    <div>
      <div className="space-y-6">
        <PageTitle title="همین حالا رزرو کن!" />
        <hr />

        {/* Service and Employee Selectors */}
        <div className="flex flex-col gap-4">
          <div>
            <select
              className="primary-input"
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
              className="primary-input"
              value={employee || ""}
              onChange={(e) => setEmployee(Number(e.target.value) || null)}
              required
            >
              <option value="">لطفاً آرایشگر را انتخاب کنید</option>
              {employeesData?.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee?.user?.first_name} - {employee?.skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Slots */}
        <div>
          <span className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-gray-200">
            <LuCalendarClock size={25} className={`text-${themeColor}-500`} />{" "}
            زمان های در دسترس
          </span>
          <div className="flex flex-col gap-2">
            {slots &&
              slots.map((slot) => (
                <div
                  className={`bg-white p-4 rounded-xl shadow-md dark:bg-gray-700 mt-4 ${
                    selectedSlotId === slot.id
                      ? `border-2 border-${themeColor}-500 transition`
                      : ""
                  }`}
                  key={slot.id}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-base flex items-center gap-1">
                        زمان شروع:
                        <span className="text-gray-500 dark:text-gray-400">
                          {slot.start_time}
                        </span>
                      </span>
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-base flex items-center gap-1">
                        تاریخ:
                        <span className="text-gray-500 dark:text-gray-400">
                          {new Date(slot.date).toLocaleDateString("fa-IR")}
                        </span>
                      </span>
                    </div>
                    <label
                      className={`flex items-center gap-2 cursor-pointer select-none ${
                        selectedSlotId === slot.id
                          ? `bg-${themeColor}-100 dark:bg-${themeColor}-500`
                          : ""
                      } p-2 rounded transition-colors duration-200`}
                      onClick={() => setSelectedSlotId(slot.id)}
                    >
                      <input
                        type="radio"
                        name="slot"
                        className="hidden peer"
                        checked={selectedSlotId === slot.id}
                        onChange={() => setSelectedSlotId(slot.id)}
                      />
                      <span
                        className={`
                          w-5 h-5 inline-block rounded-full border-2
                          border-${themeColor}-500
                          ${
                            selectedSlotId === slot.id
                              ? `bg-${themeColor}-500 border-${themeColor}-500`
                              : ""
                          }
                          transition-colors duration-200
                          bg-white dark:bg-gray-800
                        `}
                      ></span>
                      <span className="text-gray-700 dark:text-gray-200 text-sm">
                        انتخاب این زمان
                      </span>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          onClick={handleBooking}
          disabled={addAppointmentMutation.isPending}
        >
          {addAppointmentMutation.isPending ? "درحال ارسال..." : "ثبت رزرو"}
        </Button>
      </div>
    </div>
  );
};

export default Reserve;
