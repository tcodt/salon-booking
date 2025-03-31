import { BookingDataType, GetEmployees, GetServices } from "../types/types";
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

export const getServices = async (): Promise<GetServices> => {
  const response = await api.get("/business/services/");
  console.log("Get Services data: ", response.data);
  return response.data;
};

export const getEmployees = async (): Promise<GetEmployees> => {
  const response = await api.get("/business/employees/");
  console.log("Get Employees data: ", response.data);
  return response.data;
};
