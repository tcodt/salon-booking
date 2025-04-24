import { AppointmentById, AppointmentUpdate } from "../../types/appointments";
import api from "../../utils/api";

export const updateAppointment = async (data: {
  id: number;
  values: AppointmentUpdate;
}): Promise<AppointmentById> => {
  const response = await api.put(
    `/reservations/appointments/${data.id}/`,
    data.values
  );
  return response.data;
};
