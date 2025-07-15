import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useGetSlots } from "../../hooks/slots/useGetSlots";
import { SlotsResponse } from "../../types/slots";
import OptionsBox from "../../components/OptionsBox/OptionsBox";
import { IoPersonAdd } from "react-icons/io5";
import CustomModal from "../../components/CustomModal/CustomModal";
import toast from "react-hot-toast";
import Dots from "../../components/Dots/Dots";

const AvailableTimes: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { data: slots, isPending, error, isError } = useGetSlots();

  if (isError) {
    toast.error("خطا در بارگذاری زمان های در دسترس!");
    console.log("Error whilw fetching the slots: ", error);
  }

  // Helper to convert date string to Persian date
  const toPersianDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <OptionsBox
          color="sky"
          onClick={() => setIsAddOpen(true)}
          icon={<IoPersonAdd />}
          title="افزودن"
        />
        <OptionsBox
          color="green"
          onClick={() => setIsUpdateOpen(true)}
          icon={<IoPersonAdd />}
          title="بروزرسانی"
        />
        <OptionsBox
          color="red"
          onClick={() => setIsDeleteOpen(true)}
          icon={<IoPersonAdd />}
          title="حذف"
        />
      </div>

      {/* Add Slots */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن زمان در دسترس"
      >
        Add Slot
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

        {slots && slots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {slots.map((slot: SlotsResponse) => (
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
            زمانی برای نمایش وجود ندارد.
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableTimes;
