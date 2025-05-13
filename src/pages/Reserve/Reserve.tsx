import React, { useState } from "react";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "zaman";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { getUserFromStorage } from "../../utils/tokenHelper";
import { useQueryClient } from "@tanstack/react-query";
import { useAddAppointment } from "../../hooks/appointments/useAddAppointment";
import { useGetServices } from "../../hooks/services/useGetServices";
import { useGetEmployees } from "../../hooks/employees/useGetEmployees";
import { useNavigate } from "react-router";

const Reserve: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    null
  );
  const [services, setServices] = useState<number | null>(null);
  const [employee, setEmployee] = useState<number | null>(null);
  const status: string = "pending";
  const navigate = useNavigate();

  const { data: servicesData = [] } = useGetServices();
  const { data: employeesData = [] } = useGetEmployees();

  const queryClient = useQueryClient();

  const currentUser = getUserFromStorage();
  const addAppointmentMutation = useAddAppointment();

  const handleBooking = () => {
    if (!date || !time || !services) {
      toast.error("لطفا تمام فیلد ها را پر کنید!");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
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

    console.log("Sending Booking Data:", bookingData);

    addAppointmentMutation.mutate(bookingData, {
      onSuccess: (data) => {
        console.log("Reserve data: ", data);
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
        <h2 className="primary-title">همین حالا رزرو کن!</h2>
        <hr />
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
            <FaRegCalendarAlt size={25} color="gray" />
            انتخاب تاریخ:
          </label>
          <DatePicker
            onChange={(e) => setDate(e.value)}
            defaultValue={new Date()}
            locale="fa"
            inputClass="primary-input"
          />
          <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
            <FaRegClock size={25} color="gray" />
            انتخاب ساعت:
          </label>
          <TimePicker
            onChange={(e) => setTime({ hour: e.hour, minute: e.minute })}
            defaultValue={new Date()}
            locale="fa"
            inputClass="primary-input"
          />
        </div>
        <div className="flex flex-col gap-4">
          {date && (
            <p>📅 تاریخ انتخاب شده: {date.toLocaleDateString("fa-IR")}</p>
          )}
          {time && (
            <p>
              ⏰ ساعت انتخاب شده:{" "}
              {`${String(time.hour).padStart(2, "0")}:${String(
                time.minute
              ).padStart(2, "0")}:00`}
            </p>
          )}
        </div>
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
