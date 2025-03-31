import React from "react";
import { useServices } from "../../hooks/useBooking";

const AppointmentsList: React.FC = () => {
  const { data: services } = useServices();

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 h-screen w-screen overflow-y-auto pb-[160px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-transparent"
    >
      {services?.map((service) => (
        <div
          key={service.id}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg rounded-xl p-6 text-white border border-transparent hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
          <p className="text-sm mb-1">
            <span className="font-medium">کسب و کار:</span> {service.business}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">توضیحات:</span> {service.description}
          </p>
          <hr />
          <div className="flex flex-row flex-wrap items-center gap-2 pt-1">
            <p className="text-sm mb-1">
              <span className="font-medium">مدت زمان:</span> {service.duration}{" "}
              دقیقه
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">کارمند:</span> {service.employee}
            </p>
            <p className="text-sm mb-4">
              <span className="font-medium">قیمت:</span> ${service.price}
            </p>
          </div>
          <button
            onClick={() => console.log(`Delete service with id: ${service.id}`)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-300"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
