import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addEmployee,
  bookAppointment,
  getEmployeeById,
  getEmployees,
  getServices,
  getUserBookings,
  removeEmployee,
  updateEmployee,
} from "../services/bookingService";
import { NewEmployee } from "../pages/AddEmployee/AddEmployee";

// Appointments - POST
export const useBookAppointment = () => {
  return useMutation({ mutationFn: bookAppointment });
};

// Appointments - GET
export const useUserBookings = () => {
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });
};

// Services - GET
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

// Employees - GET
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

// Employees - GET by ID
export const useEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
};

// Employees - POST
export const useAddEmployee = () => {
  return useMutation<NewEmployee, Error, Omit<NewEmployee, "id">>({
    mutationFn: addEmployee,
  });
};

// Employees - PUT
export const useUpdateEmployee = (id: number) => {
  return useMutation({
    mutationFn: (data: NewEmployee) => updateEmployee(id, data),
  });
};

// Employees - DELETE
export const useRemoveEmployee = () => {
  return useMutation({
    mutationFn: removeEmployee,
  });
};
