import { useMutation } from "@tanstack/react-query";
import { updateAppointment } from "../../services/appointments/updateAppointment";

export const useUpdateAppointment = () => {
  return useMutation({
    mutationFn: updateAppointment,
  });
};
