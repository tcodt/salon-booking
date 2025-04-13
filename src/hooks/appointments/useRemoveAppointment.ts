import { useMutation } from "@tanstack/react-query";
import { removeAppointment } from "../../services/appointments/removeAppointment";

export const useRemoveAppointment = () => {
  return useMutation({
    mutationFn: removeAppointment,
  });
};
