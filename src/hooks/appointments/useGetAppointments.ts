import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/appointments/getAppointments";

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
};
