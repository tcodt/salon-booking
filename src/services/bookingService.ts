import { BookingDataType } from "../types/types";
import api from "../utils/api";

export const bookAppointment = async (bookingData: BookingDataType) => {
  const response = await api.post("/reservations/appointments/", bookingData);
  console.log("Post booking data: ", response.data);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get("/reservations/appointments/");
  console.log("Get booking data: ", response.data);
  return response.data;
};
