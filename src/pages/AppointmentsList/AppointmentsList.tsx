import React from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import DetailsMenu from "../../components/DetailsMenu/DetailsMenu";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useGetAppointments } from "../../hooks/appointments/useGetAppointments";
import { useRemoveAppointment } from "../../hooks/appointments/useRemoveAppointment";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button/Button";

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
    <div>
      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
          {appointments?.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-sm rounded-xl p-4 border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    رزور {appointment?.service?.name}
                  </h3>
                  {/* <span className="text-yellow-500">{service?.get_status}</span> */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-yellow-600">
                    {appointment?.get_status}
                  </span>
                </div>
                <div>
                  <DetailsMenu
                    menuItems={[
                      {
                        label: "مشاهده",
                        onClick: () =>
                          navigate(`/view-appointment/${appointment.id}`),
                        icon: <FaEye color="gray" />,
                      },
                      {
                        label: "حذف",
                        onClick: () => handleRemoveAppointment(appointment.id),
                        icon: <FaRegTrashAlt color="red" />,
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <p className="text-sm mb-1 text-gray-500">
                  <span className="font-medium text-gray-700">در تاریخ: </span>{" "}
                  {new Intl.DateTimeFormat("fa-IR", {
                    calendar: "persian",
                  }).format(new Date(appointment?.date))}
                </p>
                <p className="text-sm mb-1 text-gray-500">
                  <span className="font-medium text-gray-700">ساعت: </span>{" "}
                  {appointment?.time} دقیقه
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            هیچ رزوری یافت نشد!
          </h1>
          <Button onClick={() => navigate("/reserve")}>
            همین حالا رزرو کن!
          </Button>
        </div>
      )}
    </div>
  );
};
export default AppointmentsList;
