// components/AppointmentCard/AppointmentCard.tsx
import React from "react";
import { useNavigate } from "react-router";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import DetailsMenu from "../DetailsMenu/DetailsMenu";
import { MdOutlineCancel } from "react-icons/md";
import { useCancelAppointment } from "../../hooks/appointments/useCancelAppointment";
import { motion } from "framer-motion";

interface AppointmentCardProps {
  appointment: {
    id: number;
    service: { name: string };
    status: string;
    get_status: string;
    // سایر فیلدها اگر لازم بود
  };
  onRemove: (id: number) => void; // برای حذف
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onRemove,
}) => {
  const navigate = useNavigate();

  const cancelMutation = useCancelAppointment(appointment.id);

  const handleCancel = () => {
    cancelMutation.mutate();
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-4 dark:bg-gray-700"
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-1">
            رزرو {appointment?.service?.name}
          </h3>
          <div className="relative">
            <div
              className={`w-4 h-4 ${
                appointment?.status === "confirmed"
                  ? "bg-green-600"
                  : appointment?.status === "canceled"
                  ? "bg-red-600"
                  : "bg-yellow-600"
              } rounded-full animate-ping absolute`}
            ></div>
            <div
              className={`w-4 h-4 ${
                appointment?.status === "confirmed"
                  ? "bg-green-600"
                  : appointment?.status === "canceled"
                  ? "bg-red-600"
                  : "bg-yellow-600"
              } rounded-full`}
            ></div>
          </div>
          <span
            className={`text-xs ${
              appointment?.status === "confirmed"
                ? "text-green-600"
                : appointment?.status === "canceled"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {appointment?.get_status}
          </span>
        </div>

        <div>
          <DetailsMenu
            menuItems={[
              {
                label: "مشاهده",
                onClick: () => navigate(`/view-appointment/${appointment.id}`),
                icon: <FaEye color="gray" />,
              },

              // فقط اگر رزرو قابل لغو باشه، گزینه "لغو" رو نشون بده
              ...(appointment.status === "pending" ||
              appointment.status === "confirmed"
                ? [
                    {
                      label: "لغو",
                      onClick: handleCancel,
                      icon: <MdOutlineCancel color="gray" />,
                    },
                  ]
                : []),

              {
                label: "حذف",
                onClick: () => onRemove(appointment.id),
                icon: <FaRegTrashAlt color="gray" />,
              },
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
