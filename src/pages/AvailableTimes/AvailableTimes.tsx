import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetSlots } from "../../hooks/slots/useGetSlots";
import { SlotsResponse } from "../../types/slots";
import OptionsBox from "../../components/OptionsBox/OptionsBox";
import { IoPersonAdd } from "react-icons/io5";
import CustomModal from "../../components/CustomModal/CustomModal";
import toast from "react-hot-toast";
import Dots from "../../components/Dots/Dots";
import { useAddSlots } from "../../hooks/slots/useAddSlots";
import { useGetServices } from "../../hooks/services/useGetServices";
import { GetServicesItem } from "../../types/services";
import PersianDayPicker from "../../components/PersianDayPicker/PersianDayPicker";
import Button from "../../components/Button/Button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import { useThemeColor } from "../../context/ThemeColor";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { RxUpdate } from "react-icons/rx";
import { FaTrashCan } from "react-icons/fa6";

const AvailableTimes: React.FC = () => {
  const [dateValue, setDateValue] = useState<DateObject | null>(null);
  const [startTimeValue, setStartTimeValue] = useState<DateObject | null>(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [selectedService, setSelectedService] = useState<number>(0);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [filteredSlots, setFilteredSlots] = useState<
    "all" | "available" | "unavailable"
  >("all");

  const { data: slots, isPending, error, isError } = useGetSlots();
  const addSlotMutation = useAddSlots();
  const { data: services } = useGetServices();
  const { themeColor } = useThemeColor();
  const queryClient = useQueryClient();

  if (isError) {
    toast.error("خطا در بارگذاری زمان های در دسترس!");
    console.log("Error whilw fetching the slots: ", error);
  }

  // Helper to convert date string to Persian date
  const toPersianDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fa-IR");
  };

  const handleChangeDate = (
    val: DateObject | null
    // weekDay: string,
    // day: number,
    // month: string
  ) => {
    setDateValue(val);
    // console.log(
    //   `Value: ${val} \n Week Day: ${weekDay} \n Day: ${day} \n Month: ${month}`
    // );
  };

  const handleChangeTime = (
    date: DateObject | null
    // options: {
    //   validatedValue: string | string[];
    //   input: HTMLElement;
    //   isTyping: boolean;
    // }
  ) => {
    setStartTimeValue(date);
    // console.log(
    //   `Value: ${date?.format?.("HH:mm")} \n validatedValue: ${
    //     options.validatedValue
    //   }`
    // );
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert dateValue and startTimeValue to correct formats
    const dateStr = dateValue?.format?.("YYYY-MM-DD") || "";
    const startTimeStr = `${startTimeValue?.hour
      .toString()
      .padStart(2, "0")}:${startTimeValue?.minute.toString().padStart(2, "0")}`;

    const newSlotData = {
      date: dateStr,
      start_time: startTimeStr,
      is_available: isAvailable,
      service: selectedService,
    };

    addSlotMutation.mutate(newSlotData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["slots"] });
        setIsAddOpen(false);
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.log("Faild to add new slot: ", axiosError);
      },
    });
  };

  const filteredSlotsArray = useMemo(() => {
    if (!slots) return [];

    switch (filteredSlots) {
      case "available":
        return slots.filter((slot) => slot.is_available);
      case "unavailable":
        return slots.filter((slot) => !slot.is_available);
      default:
        return slots;
    }
  }, [slots, filteredSlots]);

  const handleAllAppointments = () => {
    setFilteredSlots("all");
  };

  const handleAvailableAppointments = () => {
    setFilteredSlots("available");
  };

  const handleUnAvailableAppointments = () => {
    setFilteredSlots("unavailable");
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <OptionsBox
          color={themeColor}
          onClick={() => setIsAddOpen(true)}
          icon={<IoPersonAdd />}
          title="افزودن"
        />
        <OptionsBox
          color={themeColor}
          onClick={() => setIsUpdateOpen(true)}
          icon={<RxUpdate />}
          title="بروزرسانی"
        />
        <OptionsBox
          color={themeColor}
          onClick={() => setIsDeleteOpen(true)}
          icon={<FaTrashCan />}
          title="حذف"
        />
      </div>

      {/* Add Slots */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن زمان در دسترس"
      >
        <form onSubmit={handleAddSlot} className="space-y-4">
          <div>
            <label className="block mb-1">تاریخ</label>
            <PersianDayPicker
              value={dateValue}
              onChange={handleChangeDate}
              buttonLabel={dateValue ? String(dateValue) : "انتخاب تاریخ"}
              bgColor="bg-white"
              textColor="gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">ساعت شروع</label>

            {/* Manual Time Picker */}
            <DatePicker
              calendar={persian}
              format="HH:mm"
              render={
                <button className="flex items-center gap-2 py-2 px-4 rounded-xl bg-white text-gray-600 text-base font-medium border border-gray-200">
                  {startTimeValue ? String(startTimeValue) : "انتخاب ساعت"}
                </button>
              }
              locale={persian_fa}
              value={startTimeValue}
              disableDayPicker
              plugins={[<TimePicker hideSeconds />]}
              calendarPosition="bottom-left"
              onChange={handleChangeTime}
            >
              <div className="p-2">
                <button
                  className={`bg-${themeColor}-500 text-white py-2 px-4 rounded-xl text-base font-medium w-full`}
                >
                  انتخاب
                </button>
              </div>
            </DatePicker>
            {/* Manual Time Picker */}

            {/* <PersianTimePicker
              value={startTimeValue}
              onChange={handleChangeTime}
              buttonLabel={startTimeValue?.format?.("HH:mm") || "انتخاب ساعت"}
              bgColor="bg-white"
              textColor="gray-700"
            /> */}
          </div>
          <div>
            <label className="block mb-1">سرویس</label>
            <select
              name="service"
              className="primary-input"
              required
              value={selectedService}
              onChange={(e) => setSelectedService(Number(e.target.value))}
            >
              <option value={0}>انتخاب سرویس</option>
              {services &&
                services.map((s: GetServicesItem) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_available"
              id="is_available"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
            />
            <label htmlFor="is_available">در دسترس</label>
          </div>
          <Button type="submit" disabled={addSlotMutation.isPending}>
            {addSlotMutation.isPending ? "در حال افزودن..." : "افزودن"}
          </Button>
        </form>
      </CustomModal>

      {/* Update Slots */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی زمان در دسترس"
      >
        Update Slot
      </CustomModal>

      {/* Remove Slots */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف زمان در دسترس"
      >
        Remove Slot
      </CustomModal>

      <PageTitle title="زمان های در دسترس" />
      <div className="p-4 flex flex-col items-center">
        {isPending && (
          <div className="mt-4">
            <Dots />
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <button
            className={`${
              filteredSlots == "all"
                ? `text-${themeColor}-500 border-${themeColor}-500`
                : "text-gray-500 dark:text-gray-200 border-transparent"
            } p-1 border-b-2 text-base font-medium`}
            onClick={handleAllAppointments}
          >
            همه زمان ها
          </button>
          <button
            className={`${
              filteredSlots === "available"
                ? "text-green-500 border-green-500"
                : "text-gray-500 dark:text-gray-200 border-transparent"
            } p-1 border-b-2 text-base font-medium`}
            onClick={handleAvailableAppointments}
          >
            در دسترس ها
          </button>
          <button
            className={`${
              filteredSlots === "unavailable"
                ? "text-red-500 border-red-500"
                : "text-gray-500 dark:text-gray-200 border-transparent"
            } p-1 border-b-2 text-base font-medium`}
            onClick={handleUnAvailableAppointments}
          >
            رزرو شده ها
          </button>
        </div>

        {filteredSlotsArray && filteredSlotsArray.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {filteredSlotsArray.map((slot: SlotsResponse) => (
              <div
                key={slot.id}
                className={`rounded-xl shadow-md p-4 flex flex-col items-start border-2 transition-all ${
                  slot.is_available
                    ? "border-green-400 bg-green-50 dark:bg-green-900"
                    : "border-red-400 bg-red-50 dark:bg-red-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-700 dark:text-white">
                    تاریخ:
                  </span>
                  <span className="text-base text-gray-600 dark:text-gray-300">
                    {toPersianDate(slot.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-700 dark:text-white">
                    ساعت شروع:
                  </span>
                  <span className="text-base text-gray-600 dark:text-gray-300">
                    {slot.start_time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-white">
                    وضعیت:
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      slot.is_available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {slot.is_available ? "در دسترس" : "رزرو شده"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-lg mt-8">
            {filteredSlots === "all"
              ? "زمانی برای نمایش وجود ندارد."
              : filteredSlots === "available"
              ? "زمان در دسترسی یافت نشد."
              : "زمان رزرو شده‌ای یافت نشد."}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableTimes;
