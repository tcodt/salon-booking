import { useMutation, useQuery } from "@tanstack/react-query";
import {
  bookAppointment,
  getEmployees,
  getServices,
  getUserBookings,
} from "../services/bookingService";

export const useBookAppointment = () => {
  return useMutation({ mutationFn: bookAppointment });
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: getEmployees,
  });
};
