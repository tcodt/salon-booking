import React, { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { LuNotebookText } from "react-icons/lu";
import {
  MdOutlineBookmarkAdded,
  MdOutlineBookmarkRemove,
  MdOutlineEventAvailable,
  MdWarningAmber,
} from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { HiArrowLeft } from "react-icons/hi";

import { useGetDashboardToday } from "../../hooks/dashboard/useGetDashboardToday";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import { useThemeColor } from "../../context/ThemeColor";
import { useAcl } from "../../context/AclContext";
import {
  DashboardResponse,
  AdminDashboardResponse,
  UserDashboardResponse,
} from "../../types/dashboard";
import Dots from "../../components/Dots/Dots";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const isAdminDashboard = (
  data: DashboardResponse | undefined
): data is AdminDashboardResponse => data?.type === "admin";

const isUserDashboard = (
  data: DashboardResponse | undefined
): data is UserDashboardResponse => data?.type === "user";

const formatMoney = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "confirmed":
      return "text-green-500";
    case "cancelled":
    case "canceled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

/* -------------------------------------------------------------------------- */
/* Small UI pieces                                                            */
/* -------------------------------------------------------------------------- */

const StatCard: React.FC<{
  label: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}> = ({ label, icon, className = "col-span-full" }) => (
  <div
    className={`p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm relative overflow-hidden ${className}`}
  >
    <div className="absolute top-2 left-2 opacity-50">{icon}</div>
    <div className="text-base font-medium text-gray-700 dark:text-gray-200">
      {label}
    </div>
  </div>
);

const SectionTitle: React.FC<{
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ children, action }) => (
  <div className="col-span-full mt-4 flex items-end justify-between">
    <h3 className="primary-title dark:text-white">{children}</h3>
    {action}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Admin (business owner) view                                                */
/* -------------------------------------------------------------------------- */

const AdminDashboardView: React.FC<{
  data: AdminDashboardResponse;
  themeColor: string;
}> = ({ data, themeColor }) => {
  const { data: usersData } = useGetUsers();

  const incomeData = useMemo(() => {
    const { today = 0, week = 0, month = 0 } = data.income ?? {};
    const maxIncome = Math.max(today, week, month, 1);
    return [
      { label: "امروز", value: today, height: (today / maxIncome) * 100 },
      { label: "هفته", value: week, height: (week / maxIncome) * 100 },
      { label: "ماه", value: month, height: (month / maxIncome) * 100 },
    ];
  }, [data.income]);

  const matchedUsers =
    usersData?.filter((user) =>
      data.new_users?.some((nu) => nu.id === user.id)
    ) ?? [];

  return (
    <>
      {/* Income chart */}
      {incomeData.length > 0 && (
        <div className="col-span-full">
          <div className="h-72 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 flex flex-col justify-end">
            <div
              className={`border-b-2 border-${themeColor}-500 flex flex-row items-end justify-evenly w-full h-full pb-4`}
            >
              {incomeData.map((bar, i) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center justify-end w-1/6 h-full"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className={`w-6 bg-${themeColor}-500 rounded-t-2xl min-h-[4px]`}
                  />
                  <span className="mt-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {bar.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatMoney(bar.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <StatCard
        className="col-span-3"
        icon={
          <LuNotebookText size={25} className={`text-${themeColor}-500`} />
        }
        label={
          <>
            {data.total_appointments}{" "}
            <span className="text-gray-500 dark:text-gray-300">رزرو</span>
          </>
        }
      />

      <StatCard
        className="col-span-9"
        icon={
          data.today_appointments > 0 ? (
            <MdOutlineBookmarkAdded
              size={25}
              className={`text-${themeColor}-500`}
            />
          ) : (
            <MdOutlineBookmarkRemove
              size={25}
              className={`text-${themeColor}-500`}
            />
          )
        }
        label={
          <>
            امروز{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {data.today_appointments}
            </span>{" "}
            رزرو
          </>
        }
      />

      {/* Income numbers */}
      <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full grid grid-cols-12 gap-2 relative overflow-hidden">
        <div className="absolute top-2 left-0 opacity-50">
          <GrLineChart size={25} className={`text-${themeColor}-500`} />
        </div>
        <span className="text-gray-800 font-semibold text-lg col-span-full dark:text-gray-100">
          درآمد
        </span>
        <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
          ماه:{" "}
          <span className="text-gray-500 dark:text-gray-200">
            {formatMoney(data.income?.month ?? 0)}
          </span>
        </span>
        <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
          هفته:{" "}
          <span className="text-gray-500 dark:text-gray-200">
            {formatMoney(data.income?.week ?? 0)}
          </span>
        </span>
        <span className="text-gray-700 font-medium text-base col-span-4 dark:text-gray-300">
          امروز:{" "}
          <span className="text-gray-500 dark:text-gray-200">
            {formatMoney(data.income?.today ?? 0)}
          </span>
        </span>
      </div>

      {/* Recent appointments */}
      <SectionTitle
        action={
          <Link
            to="/appointments-list"
            className={`text-sm font-medium text-${themeColor}-500 hover:opacity-70 transition-opacity`}
          >
            همه رزروها
          </Link>
        }
      >
        رزروهای اخیر
      </SectionTitle>

      {data.total_appointments < 1 && (
        <div className="col-span-full py-6 text-center">
          <p className="text-base font-medium text-gray-500 dark:text-gray-400">
            هیچ رزروی یافت نشد!
          </p>
        </div>
      )}

      {data.appointments?.map((appointment) => (
        <Link
          key={appointment.id}
          to={`/view-appointment/${appointment.id}`}
          className="hover:opacity-70 transition-opacity p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full"
        >
          <h4 className="text-base text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-between gap-2">
            <span>{appointment.service?.name ?? "سرویس"}</span>
            <span
              className={`${statusColor(appointment.status)} text-sm font-medium shrink-0`}
            >
              {appointment.get_status}
            </span>
          </h4>
          {appointment.employee_name && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {appointment.employee_name}
            </p>
          )}
        </Link>
      ))}

      {/* New users */}
      {matchedUsers.length > 0 && (
        <>
          <SectionTitle
            action={
              <Link
                to="/users"
                className={`text-sm font-medium text-${themeColor}-500 hover:opacity-70 transition-opacity`}
              >
                همه کاربران
              </Link>
            }
          >
            کاربران جدید
          </SectionTitle>

          {matchedUsers.slice(0, 4).map((user) => (
            <Link
              key={user.id}
              to={`/user-profile-detail/${user.id}`}
              className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full hover:opacity-70 transition"
            >
              <div className="flex flex-row items-center justify-between">
                <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  {user.first_name} {user.last_name}
                </h4>
                <span className={`text-${themeColor}-500 text-sm font-medium`}>
                  {user.is_owner ? "مدیر" : "کاربر"}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {user.phone_number}
              </span>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* User (customer) view                                                       */
/* -------------------------------------------------------------------------- */

const UserDashboardView: React.FC<{
  data: UserDashboardResponse;
  themeColor: string;
}> = ({ data, themeColor }) => {
  const next = data.next_appointment;

  return (
    <>
      {/* Unpaid reminder */}
      {data.unpaid_reminder && (
        <div className="col-span-full flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700">
          <MdWarningAmber
            size={24}
            className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
          />
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              پرداخت ناقص
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              یک یا چند رزرو شما هنوز پرداخت نشده است. از بخش کیف پول یا جزئیات
              رزرو اقدام کنید.
            </p>
            <Link
              to="/wallet"
              className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-800 dark:text-amber-200 hover:underline"
            >
              رفتن به کیف پول
              <HiArrowLeft size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Next appointment highlight */}
      {next ? (
        <Link
          to={`/view-appointment/${next.id}`}
          className={`col-span-full block p-5 rounded-2xl bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-600 text-white shadow-lg hover:opacity-95 transition`}
        >
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <MdOutlineEventAvailable size={22} />
            <span className="text-sm font-medium">نوبت بعدی شما</span>
          </div>
          <h4 className="text-xl font-bold">
            {next.service?.name ?? "سرویس"}
          </h4>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
            {next.employee_name && <span>{next.employee_name}</span>}
            <span
              className={`px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium`}
            >
              {next.get_status}
            </span>
          </div>
        </Link>
      ) : (
        <div className="col-span-full p-6 rounded-2xl bg-white dark:bg-gray-700 shadow-sm text-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            نوبت فعالی ندارید
          </p>
          <Link
            to="/reserve"
            className={`inline-block mt-3 px-5 py-2.5 rounded-full bg-${themeColor}-500 text-white text-sm font-medium hover:opacity-90 transition`}
          >
            رزرو نوبت جدید
          </Link>
        </div>
      )}

      {/* Total bookings */}
      <StatCard
        className="col-span-full"
        icon={
          <LuNotebookText size={25} className={`text-${themeColor}-500`} />
        }
        label={
          <>
            مجموع رزروها:{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {data.total_appointments}
            </span>
          </>
        }
      />

      {/* Last appointments */}
      <SectionTitle
        action={
          <Link
            to="/appointments-list"
            className={`text-sm font-medium text-${themeColor}-500 hover:opacity-70 transition-opacity`}
          >
            همه رزروها
          </Link>
        }
      >
        آخرین رزروها
      </SectionTitle>

      {!data.last_appointments?.length && (
        <div className="col-span-full py-6 text-center">
          <p className="text-base font-medium text-gray-500 dark:text-gray-400">
            هنوز رزروی ثبت نکرده‌اید.
          </p>
        </div>
      )}

      {data.last_appointments?.map((appointment) => (
        <Link
          key={appointment.id}
          to={`/view-appointment/${appointment.id}`}
          className="hover:opacity-70 transition-opacity p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm col-span-full"
        >
          <h4 className="text-base text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-between gap-2">
            <span>{appointment.service?.name ?? "سرویس"}</span>
            <span
              className={`${statusColor(appointment.status)} text-sm font-medium shrink-0`}
            >
              {appointment.get_status}
            </span>
          </h4>
          {appointment.employee_name && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {appointment.employee_name}
            </p>
          )}
        </Link>
      ))}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

const Dashboard: React.FC = () => {
  const {
    data: dashboardData,
    error,
    isError,
    isPending,
    isFetching,
  } = useGetDashboardToday();
  const { themeColor } = useThemeColor();
  const { role, isLoading: aclLoading } = useAcl();

  if (isPending || aclLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Dots />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center px-4">
        <p className="text-red-500 font-medium">
          خطا در دریافت داشبورد
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {(error as Error)?.message ?? "لطفاً دوباره تلاش کنید."}
        </p>
      </div>
    );
  }

  // Prefer API type; fall back to ACL role if type is missing
  const showAdmin =
    isAdminDashboard(dashboardData) ||
    (!dashboardData?.type && role === "admin");

  const showUser =
    isUserDashboard(dashboardData) ||
    (!dashboardData?.type && role !== "admin");

  return (
    <div className="relative">
      {isFetching && !isPending && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-current to-transparent opacity-40 animate-pulse" />
      )}

      <motion.div
        className="grid grid-cols-12 gap-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="primary-title col-span-full mt-4 dark:text-white">
          {showAdmin ? "گزارشات کسب‌وکار" : "داشبورد من"}
        </h3>

        {showAdmin && isAdminDashboard(dashboardData) && (
          <AdminDashboardView data={dashboardData} themeColor={themeColor} />
        )}

        {showUser && isUserDashboard(dashboardData) && (
          <UserDashboardView data={dashboardData} themeColor={themeColor} />
        )}

        {/* Fallback if API returns unexpected shape */}
        {!showAdmin && !showUser && (
          <div className="col-span-full py-10 text-center text-gray-500">
            داده‌ای برای نمایش وجود ندارد.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;