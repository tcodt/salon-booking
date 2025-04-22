import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { BiSolidCalendarCheck, BiSolidCalendarX } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import CustomModal from "../../components/CustomModal/CustomModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { useGetWorkingTime } from "../../hooks/working-time/useGetWorkingTime";
import { AxiosError } from "axios";
import { useRemoveWorkingTime } from "../../hooks/working-time/useRemoveWorkingTime";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const WorkingTime: React.FC = () => {
  const { data: workingTimes, isPending, isError, error } = useGetWorkingTime();
  const removeWorkingTimeMutation = useRemoveWorkingTime();
  const queryClient = useQueryClient();
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <button
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => navigate("/add-working-time")}
        >
          افزودن <IoPersonAdd />
        </button>
        <button
          className="bg-orange-100 text-orange-500 hover:bg-orange-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => setIsUpdateOpen(true)}
        >
          بروزرسانی <RxUpdate />
        </button>
        <button
          className="bg-red-100 text-red-500 hover:bg-red-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => setIsDeleteOpen(true)}
        >
          حذف <FaTrashCan />
        </button>
      </div>

      {/* Delete working time modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف سرویس"
      >
        <div className="flex flex-col gap-6">
          {workingTimes?.map((time) => (
            <div
              key={time.id}
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-xl border border-gray-200 p-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-gray-800 font-medium">
                  {time.day}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarCheck className="text-green-500 text-base" />
                  </div>
                  <span className="text-gray-500">{time.opening_time}</span>
                </div>
                <div className="text-sm text-gray-700 font-normal flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarX className="text-red-500 text-base" />
                  </div>
                  <span className="text-gray-500">{time.closing_time}</span>
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
        <p>درحال توسعه...</p>
      </CustomModal>

      <h2 className="primary-title">ساعات کاری</h2>
      {!workingTimes && (
        <p className="text-base text-red-500 font-normal">
          هیچ ساعت کاری تنظیم نشده است!
        </p>
      )}

      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-right border border-gray-300">روز</th>
              <th className="p-4 text-right border border-gray-300">باز شدن</th>
              <th className="p-4 text-right border border-gray-300">
                بسته شدن
              </th>
            </tr>
          </thead>
          <tbody>
            {workingTimes?.map((time) => (
              <tr key={time.id} className="bg-white">
                <td className="p-4 border border-gray-300 text-orange-500 font-medium">
                  {time.day}
                </td>
                <td className="p-4 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarCheck className="text-green-500 text-base" />
                    <span className="text-gray-500">{time.opening_time}</span>
                  </div>
                </td>
                <td className="p-4 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <BiSolidCalendarX className="text-red-500 text-base" />
                    <span className="text-gray-500">{time.closing_time}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkingTime;
