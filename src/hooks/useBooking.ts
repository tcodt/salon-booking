import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addEmployee,
  bookAppointment,
  getEmployees,
  getServices,
  getUserBookings,
} from "../services/bookingService";
import { NewEmployee } from "../pages/AddEmployee/AddEmployee";

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
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

export const useAddEmployee = () => {
  return useMutation<NewEmployee, Error, Omit<NewEmployee, "id">>({
    mutationFn: addEmployee,
  });
};
