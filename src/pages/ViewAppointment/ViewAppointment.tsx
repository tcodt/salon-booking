import React from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { LuAlarmClock } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { RiScissors2Line } from "react-icons/ri";
import { TbDeviceMobile } from "react-icons/tb";
import { BsTelephone } from "react-icons/bs";
import { useAppointmentById } from "../../hooks/appointments/useAppointmentById";

const ViewAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const { data: appointmentData, isPending } =
    useAppointmentById(appointmentId);

  if (isPending) return <Loading />;

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {appointmentData?.service?.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
            <span className="text-sm text-yellow-600">
              {appointmentData?.get_status}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {appointmentData?.service?.description}
        </p>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <LuAlarmClock className="text-xl text-orange-500" /> زمان:
          </span>{" "}
          <p className="text-gray-500">{appointmentData?.service?.duration}</p>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <MdAttachMoney className="text-xl text-orange-500" /> قیمت:
          </span>{" "}
          <p className="text-gray-500">
            {appointmentData?.service?.price} هزارتومان
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <FiUser className="text-xl text-orange-500" /> نام آرایشگر:
          </span>{" "}
          <p className="text-gray-500">
            {appointmentData?.employee?.user?.first_name}{" "}
            {appointmentData?.employee?.user?.last_name}
          </p>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <RiScissors2Line className="text-xl text-orange-500" /> مهارت:
          </span>{" "}
          <p className="text-gray-500">{appointmentData?.employee?.skill}</p>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <TbDeviceMobile className="text-xl text-orange-500" /> شماره موبایل:
          </span>{" "}
          <p className="text-gray-500">
            {appointmentData?.employee?.user?.phone_number}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <h4 className="text-base font-semibold text-gray-800">
          {appointmentData?.service?.business?.name}
        </h4>
        <p className="text-gray-500 text-sm">
          {appointmentData?.service?.business?.address}
        </p>

        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <TbDeviceMobile className="text-xl text-orange-500" /> شماره موبایل:
          </span>{" "}
          <p className="text-gray-500">
            {appointmentData?.service?.business?.phone_number}
          </p>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-700 flex items-center gap-2">
            <BsTelephone className="text-xl text-orange-500" /> تلفن:
          </span>{" "}
          <p className="text-gray-500">
            {appointmentData?.service?.business?.telephone_number}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ViewAppointment;
