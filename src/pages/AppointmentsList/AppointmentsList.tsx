import React from "react";
import { useUserBookings } from "../../hooks/useBooking";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import DetailsMenu from "../../components/DetailsMenu/DetailsMenu";
import { CiTrash } from "react-icons/ci";

const AppointmentsList: React.FC = () => {
  const { data: services, isPending, isError, error } = useUserBookings();

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.log(error);
  }

  if (isPending) return <Loading />;

  return (
    <div
      className="p-4 w-screen h-screen overflow-y-auto pb-[160px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-transparent"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {services?.map((service, index) => (
          <div key={index} className="bg-white shadow-sm rounded-xl p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  رزور {service?.service?.name}
                </h3>
                {/* <span className="text-yellow-500">{service?.get_status}</span> */}
                <div className="relative">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <DetailsMenu
                  menuItems={[
                    {
                      label: "حذف",
                      onClick: () => console.log("Delete clicked"),
                      icon: <CiTrash />,
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
                }).format(new Date(service?.date))}
              </p>
              <p className="text-sm mb-1 text-gray-500">
                <span className="font-medium text-gray-700">ساعت: </span>{" "}
                {service?.time} دقیقه
              </p>
            </div>
            <div className="my-2 text-yellow-500 text-sm">
              <span className="text-gray-700">وضعیت: </span>
              {service?.get_status}
            </div>
            {/* <div className="flex justify-end">
              <button
                onClick={() => console.log(`Delete service with id:`)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-300"
              >
                لغو
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
