import React, { FormEvent, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetSlots } from "../../hooks/slots/useGetSlots";
import { SlotsResponse } from "../../types/slots";
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
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useUpdateSlots } from "../../hooks/slots/useUpdateSlots";
import { useNavigate } from "react-router";
import { useRemoveSlots } from "../../hooks/slots/useRemoveSlots";
import Dropdown from "../../components/Dropdown/Dropdown";
import { motion } from "framer-motion";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const AvailableTimes: React.FC = () => {
  const [dateValue, setDateValue] = useState<DateObject | null>(null);
  const [startTimeValue, setStartTimeValue] = useState<DateObject | null>(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<SlotsResponse | null>(null);

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [filteredSlots, setFilteredSlots] = useState<
    "all" | "available" | "unavailable"
  >("all");

  const { data: slots, isPending, error, isError } = useGetSlots();
  const addSlotMutation = useAddSlots();
  const updateSlotMutation = useUpdateSlots();
  const removeSlotMutation = useRemoveSlots();
  const { data: services } = useGetServices();
  const { themeColor } = useThemeColor();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

    if (!dateValue || !selectedService)
      return toast.error("لطفا با دقت فرم را پر کنید");

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

  const handleUpdateSlot = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) return;

    // Convert dateValue and startTimeValue to correct formats
    const dateStr = dateValue?.format?.("YYYY-MM-DD") || selectedSlot.date;
    const startTimeStr = startTimeValue
      ? `${startTimeValue?.hour
          .toString()
          .padStart(2, "0")}:${startTimeValue?.minute
          .toString()
          .padStart(2, "0")}`
      : selectedSlot.start_time;

    const updatedSlotData = {
      service: selectedService || selectedSlot.service,
      date: dateStr,
      start_time: startTimeStr,
      is_available: isAvailable,
    };

    updateSlotMutation.mutate(
      { updateSlot: updatedSlotData, id: selectedSlot.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["slots"] });
          setIsUpdateOpen(false);
          setSelectedSlot(null);
        },
        onError: (error) => {
          const axiosError = error as AxiosError;
          console.log("Failed to update slot: ", axiosError);
          toast.error("خطا در بروزرسانی زمان!");
        },
      }
    );
  };

  const handleRemoveSlot = (id: number) => {
    const slotId = toast.loading("درحال حذف زمان...");
    removeSlotMutation.mutate(id, {
      onSuccess: () => {
        toast.success("زمان مورد نظر با موفقیت حذف شد", { id: slotId });
        queryClient.invalidateQueries({ queryKey: ["slots"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف زمان!", { id: slotId });
        console.log(error);
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

  // Calculate counts for each filter option
  const allSlotsCount = slots?.length || 0;
  const availableSlotsCount =
    slots?.filter((slot) => slot.is_available).length || 0;
  const unavailableSlotsCount =
    slots?.filter((slot) => !slot.is_available).length || 0;

  const handleAllAppointments = () => {
    setFilteredSlots("all");
  };

  const handleAvailableAppointments = () => {
    setFilteredSlots("available");
  };

  const handleUnAvailableAppointments = () => {
    setFilteredSlots("unavailable");
  };

  const availableSlots = slots?.filter((s) => s.is_available);

  return (
    <section className="space-y-6">
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
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 px-4 rounded-xl bg-white text-gray-600 text-base font-medium border border-gray-200"
                >
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
              {/* <div className="p-2">
                <button
                type="button"
                  className={`bg-${themeColor}-500 text-white py-2 px-4 rounded-xl text-base font-medium w-full`}
                >
                  انتخاب
                </button>
              </div> */}
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
        <div>
          {availableSlots && availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <div
                key={slot.id}
                className={`flex flex-col gap-2 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl bg-slate-100 dark:bg-gray-700 shadow-md p-2 mb-4`}
              >
                <div className="flex items-center gap-2 text-base font-medium">
                  <span className="text-gray-800 dark:text-gray-100">
                    تاریخ:{" "}
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {slot.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-base font-medium">
                  <span className="text-gray-800 dark:text-gray-100">
                    ساعت شروع:{" "}
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {slot.start_time}
                  </span>
                </div>
                <button
                  className={`text-xl text-${themeColor}-500 absolute top-7 left-4 hover:text-${themeColor}-600 transition`}
                  onClick={() => navigate(`/update-slots/${slot.id}`)}
                >
                  <FaPencil />
                </button>
              </div>
            ))
          ) : (
            <p className="text-base font-medium text-gray-600 dark:text-gray-300">
              هیچ زمان در دسترسی برای بروزرسانی وجود ندارد!
            </p>
          )}

          {selectedSlot && (
            <form onSubmit={handleUpdateSlot} className="space-y-4">
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
                  id="is_available_update"
                  checked={isAvailable}
                  onChange={() => setIsAvailable(!isAvailable)}
                />
                <label htmlFor="is_available_update">در دسترس</label>
              </div>
              <Button type="submit" disabled={updateSlotMutation.isPending}>
                {updateSlotMutation.isPending
                  ? "در حال بروزرسانی..."
                  : "بروزرسانی"}
              </Button>
            </form>
          )}
        </div>
      </CustomModal>

      {/* Remove Slots */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف زمان در دسترس"
      >
        {availableSlots && availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <div
              key={slot.id}
              className={`flex flex-col gap-2 relative border-s-2 border-s-red-500 rounded-e-xl bg-slate-100 dark:bg-gray-700 shadow-md p-2 mb-4`}
            >
              <div className="flex items-center gap-2 text-base font-medium">
                <span className="text-gray-800 dark:text-gray-100">
                  تاریخ:{" "}
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-300">
                  {slot.date}
                </span>
              </div>
              <div className="flex items-center gap-2 text-base font-medium">
                <span className="text-gray-800 dark:text-gray-100">
                  ساعت شروع:{" "}
                </span>{" "}
                <span className="text-gray-600 dark:text-gray-300">
                  {slot.start_time}
                </span>
              </div>
              <button
                className={`text-xl text-red-500 absolute top-7 left-4 hover:text-red-600 transition`}
                onClick={() => handleRemoveSlot(slot.id)}
              >
                <FaTrashCan />
              </button>
            </div>
          ))
        ) : (
          <p className="text-base font-medium text-gray-600 dark:text-gray-300">
            هیچ زمان در دسترسی برای حذف وجود ندارد!
          </p>
        )}
      </CustomModal>

      <div className="flex flex-row justify-between items-center mt-8">
        <PageTitle title="زمان های در دسترس" />
        {/* Edit Box */}
        <div className="flex flex-row flex-wrap items-center gap-2">
          <Dropdown
            isAddOpen={isAddOpen}
            setIsAddOpen={setIsAddOpen}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
          />
        </div>
      </div>

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
            } p-1 border-b-2 text-base font-medium relative`}
            onClick={handleAllAppointments}
          >
            <div
              className={`absolute -top-3 -right-1 bg-${themeColor}-500 text-white text-xs w-6 h-4 rounded-full flex items-center justify-center`}
            >
              {allSlotsCount}
            </div>
            همه زمان ها
          </button>
          <button
            className={`${
              filteredSlots === "available"
                ? "text-green-500 border-green-500"
                : "text-gray-500 dark:text-gray-200 border-transparent"
            } p-1 border-b-2 text-base font-medium relative`}
            onClick={handleAvailableAppointments}
          >
            <div
              className={`absolute -top-3 -right-1 bg-${themeColor}-500 text-white text-xs w-6 h-4 rounded-full flex items-center justify-center`}
            >
              {availableSlotsCount}
            </div>
            در دسترس ها
          </button>
          <button
            className={`${
              filteredSlots === "unavailable"
                ? "text-red-500 border-red-500"
                : "text-gray-500 dark:text-gray-200 border-transparent"
            } p-1 border-b-2 text-base font-medium relative`}
            onClick={handleUnAvailableAppointments}
          >
            <div
              className={`absolute -top-3 -right-1 bg-${themeColor}-500 text-white text-xs w-6 h-4 rounded-full flex items-center justify-center`}
            >
              {unavailableSlotsCount}
            </div>
            رزرو شده ها
          </button>
        </div>

        {filteredSlotsArray && filteredSlotsArray.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSlotsArray.map((slot: SlotsResponse) => (
              <motion.div
                key={slot.id}
                className={`rounded-xl shadow-md p-4 flex flex-col items-start border-2 transition-all ${
                  slot.is_available
                    ? "border-green-400 bg-green-50 dark:bg-green-900"
                    : "border-red-400 bg-red-50 dark:bg-red-900"
                }`}
                variants={childrenVariants}
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
              </motion.div>
            ))}
          </motion.div>
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
