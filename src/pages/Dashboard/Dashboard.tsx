import React from "react";
import { useGetDashboardToday } from "../../hooks/dashboard/useGetDashboardToday";
import { LuNotebookText } from "react-icons/lu";
import { useThemeColor } from "../../context/ThemeColor";
import {
  MdOutlineBookmarkAdded,
  MdOutlineBookmarkRemove,
} from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { Link } from "react-router";

const Dashboard: React.FC = () => {
  const { data: dashboardData, error, isError } = useGetDashboardToday();
  const { themeColor } = useThemeColor();

  console.log("Dashboard Data: ", dashboardData);

  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-12 gap-2">
        <h3 className="primary-title col-span-full mt-4">گزارشات</h3>
        <div className="p-4 bg-white rounded-xl shadow-sm col-span-3 relative overflow-hidden">
          <div className="absolute top-2 left-2">
            <LuNotebookText
              size={25}
              className={`text-${themeColor}-500 opacity-50`}
            />
          </div>
          <span className="text-base font-medium text-gray-500">
            {dashboardData?.total_appointments}
            <span className="text-gray-700">رزرو</span>
          </span>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm col-span-9 relative overflow-hidden">
          <div className="absolute top-2 left-2">
            {dashboardData && dashboardData?.today_appointments > 0 ? (
              <MdOutlineBookmarkAdded
                size={25}
                className={`text-${themeColor}-500 opacity-50`}
              />
            ) : (
              <MdOutlineBookmarkRemove
                size={25}
                className={`text-${themeColor}-500 opacity-50`}
              />
            )}
          </div>
          <span className="text-base font-medium text-gray-700">
            امروز{" "}
            <span className="text-gray-500">
              {dashboardData?.today_appointments}
            </span>{" "}
            رزرو
          </span>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm col-span-full grid grid-cols-12 gap-2 relative overflow-hidden">
          <div className="absolute top-2 left-0">
            <GrLineChart
              size={25}
              className={`text-${themeColor}-500 opacity-50`}
            />
          </div>
          <span className="text-gray-800 font-semibold text-lg col-span-full">
            درآمد
          </span>
          <span className="text-gray-700 font-medium text-base col-span-4">
            ماه:{" "}
            <span className="text-gray-500">
              {dashboardData?.income?.month} تومان
            </span>
          </span>
          <span className="text-gray-700 font-medium text-base col-span-4">
            هفته:{" "}
            <span className="text-gray-500">
              {dashboardData?.income?.week} تومان
            </span>
          </span>
          <span className="text-gray-700 font-medium text-base col-span-4">
            امروز:{" "}
            <span className="text-gray-500">
              {dashboardData?.income?.today} تومان
            </span>
          </span>
        </div>

        <h3 className="primary-title col-span-full mt-4">رزرو ها</h3>

        {dashboardData?.appointments.map((appointment) => (
          <Link
            to={`/view-appointment/${appointment?.id}`}
            key={appointment?.id}
            className="hover:opacity-50 transition-opacity p-4 bg-white rounded-xl shadow-sm col-span-full relative overflow-hidden"
          >
            <h4 className="text-base text-gray-700 font-semibold flex items-center justify-between">
              {appointment?.service?.name}
              <span
                className={`${
                  appointment?.status === "pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                } text-sm font-medium`}
              >
                {appointment?.get_status}
              </span>
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
