import { useMutation } from "@tanstack/react-query";
import { addAppointment } from "../../services/appointments/addAppointment";

export const useAddAppointment = () => {
  return useMutation({ mutationFn: addAppointment });
};
