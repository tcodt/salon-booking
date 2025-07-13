import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { BiSolidCalendarCheck, BiSolidCalendarX } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import CustomModal from "../../components/CustomModal/CustomModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { useGetWorkingTime } from "../../hooks/working-time/useGetWorkingTime";
import { AxiosError } from "axios";
import { useRemoveWorkingTime } from "../../hooks/working-time/useRemoveWorkingTime";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";
import OptionsBox from "../../components/OptionsBox/OptionsBox";

const WorkingTime: React.FC = () => {
  const { data: workingTimes, isPending, isError, error } = useGetWorkingTime();
  const removeWorkingTimeMutation = useRemoveWorkingTime();
  const queryClient = useQueryClient();
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { themeColor } = useThemeColor();

  if (isPending) return <Loading />;

  if (isError) {
    console.log(error);
    toast.error("خطا در ساعات کاری!");
  }

  const handleRemoveTime = (id: number) => {
    const removeWorkingTimeId = toast.loading("درحال حذف سرویس...");
    removeWorkingTimeMutation.mutate(id, {
      onSuccess: () => {
        toast.success("ساعت کاری مورد نظر با موفقیت حذف شد", {
          id: removeWorkingTimeId,
        });
        queryClient.invalidateQueries({ queryKey: ["working_time"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف ساعت کاری!", { id: removeWorkingTimeId });
        const axiosError = error as AxiosError;
        console.log(axiosError);
      },
    });
  };

  const handleUpdateWorkingTime = (id: number) => {
    navigate(`/update-working-time/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <OptionsBox
          color="sky"
          onClick={() => navigate("/add-working-time")}
          icon={<IoPersonAdd />}
          title="افزودن"
        />
        <OptionsBox
          color="green"
          onClick={() => setIsUpdateOpen(true)}
          icon={<RxUpdate />}
          title="بروزرسانی"
        />
        <OptionsBox
          color="red"
          onClick={() => setIsDeleteOpen(true)}
          icon={<FaTrashCan />}
          title="حذف"
        />
      </div>

      {/* Delete working time modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف ساعت کاری"
      >
        <div className="flex flex-col gap-6">
          {workingTimes?.map((time) => (
            <div
              key={time.id}
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-gray-800 font-medium dark:text-white">
                  {time.day}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarCheck className="text-green-500 text-base" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-300">
                    {time.opening_time}
                  </span>
                </div>
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarX className="text-red-500 text-base" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-300">
                    {time.closing_time}
                  </span>
                </div>
              </div>

              <button
                className="text-xl text-red-500 absolute top-6 left-3 hover:text-red-600 transition"
                onClick={() => handleRemoveTime(time.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      {/* Update working time modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی ساعت کاری"
      >
        <div className="flex flex-col gap-6">
          {workingTimes?.map((time) => (
            <div
              key={time.id}
              className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-gray-800 font-medium dark:text-white">
                  {time.day}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarCheck className="text-green-500 text-base" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-300">
                    {time.opening_time}
                  </span>
                </div>
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarX className="text-red-500 text-base" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-300">
                    {time.closing_time}
                  </span>
                </div>
              </div>

              <button
                className={`text-xl text-${themeColor}-500 absolute top-6 left-3 hover:text-${themeColor}-600 transition`}
                onClick={() => handleUpdateWorkingTime(time.id)}
              >
                <FaPencil />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <PageTitle title="ساعات کاری" />
      {!workingTimes?.length && (
        <p className="text-center p-6 text-gray-500">
          هیچ ساعت کاری تنظیم نشده است!
        </p>
      )}

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6">
          {workingTimes?.map((time) => (
            <div
              key={time.id}
              className="p-4 rounded-xl bg-white shadow-md dark:bg-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold text-${themeColor}-500`}>
                  {time.day}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <BiSolidCalendarCheck className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium dark:text-gray-300">
                    باز شدن: {time.opening_time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BiSolidCalendarX className="text-red-500 text-xl" />
                  <span className="text-gray-700 font-medium dark:text-gray-300">
                    بسته شدن: {time.closing_time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingTime;
