import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useUpdateAppointment } from "../../hooks/appointments/useUpdateAppointment";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import { DatePicker, TimePicker } from "zaman";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { useAppointmentById } from "../../hooks/appointments/useAppointmentById";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";

const UpdateAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: appointment,
    isPending,
    isError,
    error,
  } = useAppointmentById(Number(id));
  const updateAppointmentMutation = useUpdateAppointment();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    null
  );
  const { themeColor } = useThemeColor();

  // Initialize date and time when appointment data is loaded
  useEffect(() => {
    if (appointment) {
      setDate(new Date(appointment.date));
      const [hour, minute] = appointment.time.split(":").map(Number);
      setTime({ hour, minute });
    }
  }, [appointment]);

  if (isError) {
    toast.error("خطا در بارگذاری رزرو!");
    console.log(error);
    return <div>خطا در بارگذاری رزرو!</div>;
  }

  if (isPending || !date || !time) return <Loading />;

  const handleUpdateAppointment = () => {
    if (!date || !time) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    const updateData = {
      date: date.toISOString().split("T")[0],
      time: `${String(time.hour).padStart(2, "0")}:${String(
        time.minute
      ).padStart(2, "0")}:00`,
      status: "pending",
      user: appointment.user,
      service_id: appointment.service.id,
      employee_id: appointment.employee.id,
    };

    const updateToastId = toast.loading("در حال بروزرسانی...");
    updateAppointmentMutation.mutate(
      { id: Number(id), values: updateData },
      {
        onSuccess: () => {
          toast.success("رزرو با موفقیت بروزرسانی شد", { id: updateToastId });
          navigate("/appointments");
        },
        onError: (error) => {
          toast.error("خطا در بروزرسانی رزرو!", { id: updateToastId });
          console.log(error);
        },
      }
    );
  };

  return (
    <div>
      <PageTitle title="ویرایش رزرو" />
      <div className="space-y-6 mt-8">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-white">
            <FaRegCalendarAlt size={25} className={`text-${themeColor}-500`} />
            انتخاب تاریخ:
          </label>
          <DatePicker
            defaultValue={date || undefined}
            onChange={(e) => setDate(e.value)}
            locale="fa"
            inputClass="primary-input"
          />
          <label className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-white">
            <FaRegClock size={25} className={`text-${themeColor}-500`} />
            انتخاب ساعت:
          </label>
          <TimePicker
            defaultValue={
              time ? new Date(0, 0, 0, time.hour, time.minute) : undefined
            }
            onChange={(e) => setTime({ hour: e.hour, minute: e.minute })}
            locale="fa"
            inputClass="primary-input"
          />
        </div>
        <div className="flex flex-col gap-4">
          {date && (
            <p className="text-gray-600 dark:text-gray-300 text-base">
              📅 تاریخ انتخاب شده: {date.toLocaleDateString("fa-IR")}
            </p>
          )}
          {time && (
            <p className="text-gray-600 dark:text-gray-300 text-base">
              ⏰ ساعت انتخاب شده:{" "}
              {`${String(time.hour).padStart(2, "0")}:${String(
                time.minute
              ).padStart(2, "0")}:00`}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <Button onClick={handleUpdateAppointment}>بروزرسانی</Button>
          <button
            onClick={() => navigate("/appointments-list")}
            className="py-2 px-4 rounded-full bg-white border border-red-500 hover:bg-red-500 text-red-500 hover:text-white transition dark:bg-red-500 dark:text-white"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAppointment;
