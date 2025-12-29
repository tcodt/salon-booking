import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { LuAlarmClock, LuDownload } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { RiScissors2Line } from "react-icons/ri";
import { TbDeviceMobile } from "react-icons/tb";
import { BsTelephone } from "react-icons/bs";
import { useAppointmentById } from "../../hooks/appointments/useAppointmentById";
import { useThemeColor } from "../../context/ThemeColor";
import Button from "../../components/Button/Button";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useWallet } from "../../context/WalletContext";

const ViewAppointment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const { data: appointmentData, isPending } =
    useAppointmentById(appointmentId);
  const { themeColor } = useThemeColor();
  const { spend, balance } = useWallet();
  const navigate = useNavigate();

  if (isPending) return <Loading />;

  const handleRedirectToWallet = () => {
    navigate("/wallet");
  };

  return (
    <div className="mt-8">
      <div className="p-4 bg-white rounded-xl shadow-md space-y-6 dark:bg-gray-700">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {appointmentData?.service?.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div
                  className={`w-4 h-4 ${
                    appointmentData?.status === "pending"
                      ? "bg-yellow-500"
                      : appointmentData?.status === "canceled"
                      ? "bg-red-600"
                      : "bg-green-600"
                  } rounded-full animate-ping absolute`}
                ></div>
                <div
                  className={`w-4 h-4 ${
                    appointmentData?.status === "pending"
                      ? "bg-yellow-500"
                      : appointmentData?.status === "canceled"
                      ? "bg-red-600"
                      : "bg-green-600"
                  } rounded-full`}
                ></div>
              </div>
              <span
                className={`text-sm ${
                  appointmentData?.status === "pending"
                    ? "text-yellow-500"
                    : appointmentData?.status === "canceled"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {appointmentData?.get_status}
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-sm dark:text-gray-300">
            {appointmentData?.service?.description}
          </p>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <LuAlarmClock className={`text-xl text-${themeColor}-500`} />{" "}
              زمان:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.service?.duration}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <MdAttachMoney className={`text-xl text-${themeColor}-500`} />{" "}
              قیمت:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.service?.price} هزارتومان
            </p>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <FiUser className={`text-xl text-${themeColor}-500`} /> نام
              آرایشگر:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.employee?.user?.first_name}{" "}
              {appointmentData?.employee?.user?.last_name}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <RiScissors2Line className={`text-xl text-${themeColor}-500`} />{" "}
              مهارت:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.employee?.skill}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <TbDeviceMobile className={`text-xl text-${themeColor}-500`} />{" "}
              شماره موبایل:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.employee?.user?.phone_number}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white">
            {appointmentData?.service?.business?.name}
          </h4>
          <p className="text-gray-500 text-sm dark:text-gray-300">
            {appointmentData?.service?.business?.address}
          </p>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <TbDeviceMobile className={`text-xl text-${themeColor}-500`} />{" "}
              شماره موبایل:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.service?.business?.phone_number}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-700 flex items-center gap-2 dark:text-gray-200">
              <BsTelephone className={`text-xl text-${themeColor}-500`} /> تلفن:
            </span>{" "}
            <p className="text-gray-500 dark:text-gray-400">
              {appointmentData?.service?.business?.telephone_number}
            </p>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsDone(false);
        }}
        title="تکمیل پرداخت"
      >
        <div className="space-y-6">
          {isDone ? (
            <img
              src="/images/tick-payment.png"
              alt="Tick Payment"
              className="h-[250px] w-[250px] object-contain mx-auto"
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
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
                <div
                  className={`${
                    Number(appointmentData?.service?.price ?? 0) > balance
                      ? "text-red-500"
                      : "text-green-500"
                  } font-bold text-base`}
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    موجودی :{" "}
                  </span>
                  {balance.toLocaleString()} تومان
                </div>
              </div>
              <div>
                <span className="text-gray-700 dark:text-gray-300 text-base font-medium">
                  قیمت:{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {appointmentData?.service?.price}
                  </span>{" "}
                  تومان
                </span>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {!isDone ? (
              <Button
                onClick={() => {
                  setIsDone(true);
                  spend(Number(appointmentData?.service?.price));
                }}
                disabled={
                  Number(appointmentData?.service?.price ?? 0) > balance
                }
              >
                اتمام پرداخت
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-base font-semibold text-gray-700 block mb-4 dark:text-white">
                  پرداخت با موفقیت انجام شد!
                </p>
                <Link
                  to="/home"
                  className={`text-${themeColor}-500 text-base font-semibold underline`}
                >
                  صفحه اصلی
                </Link>
              </div>
            )}

            {Number(appointmentData?.service?.price ?? 0) > balance &&
              !isDone && (
                <Button onClick={handleRedirectToWallet}>شارژ کیف پول</Button>
              )}
          </div>
        </div>
      </CustomModal>

      <div className="flex justify-start gap-4 mt-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={appointmentData?.status === "canceled"}
        >
          تکمیل پرداخت
        </Button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-xl hover:bg-gray-400 hover:text-white transition flex items-center gap-2"
          onClick={() => {
            const appointment = appointmentData;
            const lines = [
              "رسید نوبت",
              "-----------------------------",
              `سرویس: ${appointment?.service?.name ?? ""}`,
              `توضیحات: ${appointment?.service?.description ?? ""}`,
              `مدت زمان: ${appointment?.service?.duration ?? ""}`,
              `قیمت: ${appointment?.service?.price ?? ""} هزارتومان`,
              "",
              `آرایشگر: ${appointment?.employee?.user?.first_name ?? ""} ${
                appointment?.employee?.user?.last_name ?? ""
              }`,
              `مهارت: ${appointment?.employee?.skill ?? ""}`,
              `شماره موبایل آرایشگر: ${
                appointment?.employee?.user?.phone_number ?? ""
              }`,
              "",
              `سالن: ${appointment?.service?.business?.name ?? ""}`,
              `آدرس: ${appointment?.service?.business?.address ?? ""}`,
              `شماره موبایل سالن: ${
                appointment?.service?.business?.phone_number ?? ""
              }`,
              `تلفن سالن: ${
                appointment?.service?.business?.telephone_number ?? ""
              }`,
              "",
              `وضعیت: ${appointment?.get_status ?? ""}`,
              "-----------------------------",
              "با تشکر از انتخاب شما",
            ];
            const text = lines.join("\n");
            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "appointment-receipt.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
        >
          <LuDownload size={20} />
        </button>
      </div>
    </div>
  );
};
export default ViewAppointment;
