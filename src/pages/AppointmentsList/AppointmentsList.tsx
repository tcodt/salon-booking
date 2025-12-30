import React from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
// import DetailsMenu from "../../components/DetailsMenu/DetailsMenu";
// import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useGetAppointments } from "../../hooks/appointments/useGetAppointments";
import { useRemoveAppointment } from "../../hooks/appointments/useRemoveAppointment";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
// import { FaPencil } from "react-icons/fa6";
import PageTitle from "../../components/PageTitle/PageTitle";
import { PiFilesDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import AppointmentCard from "../../components/AppointmentCard/AccpointmentCard";

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// const childrenVariants = {
//   hidden: { opacity: 0, x: 100 },
//   visible: {
//     opacity: 1,
//     x: 0,
//   },
// };

const AppointmentsList: React.FC = () => {
  const {
    data: appointments,
    isPending,
    isError,
    error,
  } = useGetAppointments();

  const navigate = useNavigate();
  const removeAppointmentMutation = useRemoveAppointment();
  const queryClient = useQueryClient();

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.log(error);
  }

  if (isPending) return <Loading />;

  const handleRemoveAppointment = (id: number) => {
    const removeAppointmentId = toast.loading("لطفا منتظر بمانید...");
    removeAppointmentMutation.mutate(id, {
      onSuccess: () => {
        toast.success("رزور مورد نظر با موفقیت حذف شد", {
          id: removeAppointmentId,
        });
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف رزور!", { id: removeAppointmentId });
        console.log(error);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageTitle title="رزرو ها" />
      {appointments && appointments.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {appointments?.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onRemove={handleRemoveAppointment}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-start gap-6 pt-16">
          <PiFilesDuotone size={60} color="gray" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
            هیچ رزوری یافت نشد!
          </h1>
          <Button variant="secondary" onClick={() => navigate("/reserve")}>
            همین حالا رزرو کن!
          </Button>
        </div>
      )}
    </div>
  );
};
export default AppointmentsList;
