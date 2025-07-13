import React from "react";
import { useThemeColor } from "../../context/ThemeColor";
import { useGetWallet } from "../../hooks/wallet/useGetWallet";

const Wallet: React.FC = () => {
  const { themeColor } = useThemeColor();

  const { data: walletData, error, isError, isPending } = useGetWallet();

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 w-full max-w-md mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`bg-${themeColor}-100 text-${themeColor}-600 rounded-full p-3 mr-3`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M17 9V7a5 5 0 00-10 0v2" />
              <rect width="20" height="13" x="2" y="9" rx="2" />
              <path d="M16 13a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          <div>
            <div className="text-gray-700 dark:text-white font-bold text-lg">
              کیف پول شما
            </div>
            <div className="text-gray-500 dark:text-gray-300 text-sm">
              موجودی فعلی
            </div>
          </div>
        </div>
        <div className="text-2xl font-extrabold text-gray-800 dark:text-white text-center mb-4">
          {isPending ? (
            <div>درحال بارگذاری...</div>
          ) : (
            `${walletData?.balance} تومان`
          )}
        </div>
        <button
          className={`w-full bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white py-2 rounded-lg transition`}
        >
          افزایش موجودی
        </button>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-4 w-full max-w-md">
        <div className="flex items-center gap-4 mb-2">
          <span
            className={`bg-blue-100 text-${themeColor}-600 rounded-full p-2 mr-2`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </span>
          <span className="font-semibold text-gray-700 dark:text-white">
            تراکنش‌های اخیر
          </span>
        </div>
        <ul className="divide-y divide-gray-200 text-right">
          <li className="py-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              پرداخت به سالن زیبایی
            </span>
            <span className="text-red-500">-۲۰۰٬۰۰۰</span>
          </li>
          <li className="py-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              افزایش موجودی
            </span>
            <span className="text-green-500">+۵۰۰٬۰۰۰</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
