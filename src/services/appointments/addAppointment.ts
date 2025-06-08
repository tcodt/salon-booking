import { ReservationRequest } from "../../types/appointments";
import api from "../../utils/api";

export const addAppointment = async (bookingData: ReservationRequest) => {
  const response = await api.post("/reservations/appointments/", bookingData);
  return response.data;
};
