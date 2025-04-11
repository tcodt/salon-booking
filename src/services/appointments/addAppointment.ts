import { AppointmentDataType } from "../../types/appointments";
import api from "../../utils/api";

export const addAppointment = async (bookingData: AppointmentDataType) => {
  const response = await api.post("/reservations/appointments/", bookingData);
  return response.data;
};
