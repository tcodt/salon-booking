import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "../../services/appointments/getAppointmentById";

export const useAppointmentById = (id: number) => {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById(id),
    enabled: !!id,
  });
};
