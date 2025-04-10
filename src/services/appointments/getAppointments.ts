import { Appointments } from "../../types/types";
import api from "../../utils/api";

export const getAppointments = async (): Promise<Appointments> => {
  const response = await api.get("/reservations/appointments/");
  return response.data;
};
