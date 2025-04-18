import { AppointmentById } from "../../types/appointments";
import api from "../../utils/api";

export const getAppointmentById = async (
  id: number
): Promise<AppointmentById> => {
  const response = await api.get(`/reservations/appointments/${id}/`);
  return response.data;
};
