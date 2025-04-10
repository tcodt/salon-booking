import { BookingDataType } from "../../types/types";
import api from "../../utils/api";

export const addAppointment = async (bookingData: BookingDataType) => {
  const response = await api.post("/reservations/appointments/", bookingData);
  return response.data;
};
