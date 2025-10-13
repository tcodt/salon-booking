import React, { useMemo } from "react";
import { useGetDashboardToday } from "../../hooks/dashboard/useGetDashboardToday";
import { LuNotebookText } from "react-icons/lu";
import { useThemeColor } from "../../context/ThemeColor";
import {
  MdOutlineBookmarkAdded,
  MdOutlineBookmarkRemove,
} from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { Link } from "react-router";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import { motion } from "framer-motion";
import { DashboardResponse } from "../../types/dashboard";

// 👇 Type guard to ensure we safely access admin fields
const isAdminDashboard = (
  data: DashboardResponse | undefined
): data is Extract<DashboardResponse, { type: "admin" }> =>
  data?.type === "admin";

const Dashboard: React.FC = () => {
  const { data: dashboardData, error, isError } = useGetDashboardToday();
  const { data: usersData } = useGetUsers();
  const { themeColor } = useThemeColor();

  // ✅ Use type guard before accessing admin-only fields
  const incomeData = useMemo(() => {
    if (!isAdminDashboard(dashboardData)) return [];
    const { today = 0, week = 0, month = 0 } = dashboardData.income;
    const maxIncome = Math.max(today, week, month) || 1;
    return [
      { label: "امروز", value: today, height: (today / maxIncome) * 100 },
      { label: "هفته", value: week, height: (week / maxIncome) * 100 },
      { label: "ماه", value: month, height: (month / maxIncome) * 100 },
    ];
  }, [dashboardData]);

  // Handle error
  if (isError) return <div>{error.message}</div>;

  // Match new users
  const newUserIds =
    dashboardData?.type === "admin" &&
    dashboardData?.new_users.map((nw) => nw?.id);
  const matchedUsers = usersData?.filter(
    (user) => newUserIds && newUserIds?.includes(user.id)
  );

  return (
    <div>
      <motion.div
        className="grid grid-cols-12 gap-2"
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="primary-title col-span-full mt-4 dark:text-white">
          گزارشات
        </h3>

        {/* Income Chart */}
        {dashboardData?.type === "admin" && (
          <div className="col-span-full">
            <div className="h-72 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 flex flex-col justify-end">
              <div
                className={`border-b-2 border-${themeColor}-500 flex flex-row items-end justify-evenly w-full h-full pb-4`}
              >
                {incomeData.map((bar, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-end w-1/6 h-full"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.height}%` }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className={`w-6 bg-${themeColor}-500 rounded-t-2xl`}
                    />
                    <span className="mt-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
                      {bar.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {bar.value.toLocaleString()} تومان
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* /Income Chart */}

        <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-3 relative overflow-hidden">
          <div className="absolute top-2 left-2">
            <LuNotebookText
              size={25}
              className={`text-${themeColor}-500 opacity-50`}
            />
          </div>
          <span className="text-base font-medium text-gray-500 dark:text-gray-300">
            {dashboardData?.total_appointments}{" "}
            <span className="text-gray-700 dark:text-gray-200">رزرو</span>
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-9 relative overflow-hidden">
          <div className="absolute top-2 left-2">
            {dashboardData &&
            dashboardData?.type === "admin" &&
            dashboardData?.today_appointments > 0 ? (
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
          <span className="text-base font-medium text-gray-700 dark:text-gray-200">
            امروز{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {dashboardData?.type === "admin" &&
                dashboardData?.today_appointments}
              {dashboardData?.type === "user" &&
                dashboardData?.last_appointments.length}
            </span>{" "}
            رزرو
          </span>
        </div>

        {dashboardData?.type === "admin" && (
          <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full grid grid-cols-12 gap-2 relative overflow-hidden">
            <div className="absolute top-2 left-0">
              <GrLineChart
                size={25}
                className={`text-${themeColor}-500 opacity-50`}
              />
            </div>
            <span className="text-gray-800 font-semibold text-lg col-span-full dark:text-gray-100">
              درآمد
            </span>
            <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
              ماه:{" "}
              <span className="text-gray-500 dark:text-gray-200">
                {dashboardData?.income?.month} تومان
              </span>
            </span>
            <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
              هفته:{" "}
              <span className="text-gray-500 dark:text-gray-200">
                {dashboardData?.income?.week} تومان
              </span>
            </span>
            <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
              امروز:{" "}
              <span className="text-gray-500 dark:text-gray-200">
                {dashboardData?.income?.today} تومان
              </span>
            </span>
          </div>
        )}

        <h3 className="primary-title col-span-full mt-4 dark:text-white">
          رزرو ها
        </h3>

        {dashboardData && dashboardData?.total_appointments < 1 && (
          <div className="col-span-full">
            <p className="text-base font-medium text-gray-500 text-center">
              هیچ رزوری یافت نشد!
            </p>
          </div>
        )}

        {dashboardData?.type === "admin" &&
          dashboardData?.appointments.map((appointment) => (
            <Link
              to={`/view-appointment/${appointment?.id}`}
              key={appointment?.id}
              className="hover:opacity-50 transition-opacity p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full relative overflow-hidden"
            >
              <h4 className="text-base text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-between">
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

        {dashboardData?.type === "admin" && (
          <div className="col-span-full flex flex-row items-end justify-between">
            <h3 className="primary-title col-span-full mt-4 dark:text-white">
              کاربران
            </h3>
            <Link
              to="/users"
              className={`text-sm font-medium text-${themeColor}-500 hover:opacity-50 transition-opacity`}
            >
              همه کاربران
            </Link>
          </div>
        )}

        {matchedUsers?.slice(0, 4).map((user) => (
          <Link
            to={`/user-profile-detail/${user?.id}`}
            key={user?.id}
            className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full hover:opacity-50 transition"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  {user.first_name} {user?.last_name}
                </h4>
                <span className={`text-${themeColor}-500 text-sm font-medium`}>
                  {user?.is_owner ? "مدیر" : "کاربر"}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {user?.phone_number}
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
