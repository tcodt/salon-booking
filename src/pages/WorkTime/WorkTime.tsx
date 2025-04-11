import React from "react";
import { useGetWorkTime } from "../../hooks/work-time/useGetWorkTime";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { BiSolidCalendarCheck, BiSolidCalendarX } from "react-icons/bi";

const WorkTime: React.FC = () => {
  const { data: workTimes, isPending, isError, error } = useGetWorkTime();

  if (isPending) return <Loading />;

  if (isError) {
    console.log(error);
    toast.error("خطا در ساعات کاری!");
  }

  return (
    <div>
      <h2 className="primary-title">ساعات کاری</h2>
      {!workTimes && (
        <p className="text-base text-red-500 font-normal">
          هیچ ساعت کاری تنظیم نشده است!
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4">
        {workTimes?.map((time) => (
          <div
            key={time.id}
            className="p-4 bg-white border border-gray-300 rounded-xl shadow-sm"
          >
            <div className="text-xl text-orange-500 font-medium mb-4 bg-slate-100 p-1 rounded-xl">
              <h3>{time.day}</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-700 font-normal flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BiSolidCalendarX className="text-red-500 text-base" /> ساعت
                  بسته شدن:
                </div>
                <span className="text-gray-500">{time.closing_time}</span>
              </div>
              <div className="text-sm text-gray-700 font-normal flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BiSolidCalendarCheck className="text-green-500 text-base" />{" "}
                  ساعت باز شدن:
                </div>
                <span className="text-gray-500">{time.opening_time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkTime;
