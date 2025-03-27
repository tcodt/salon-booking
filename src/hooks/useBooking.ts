import { useMutation, useQuery } from "@tanstack/react-query";
import { bookAppointment, getUserBookings } from "../services/bookingService";

export const useBookAppointment = () => {
  return useMutation({ mutationFn: bookAppointment });
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });
};
