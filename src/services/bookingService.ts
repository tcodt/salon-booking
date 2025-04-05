import { NewEmployee } from "../pages/AddEmployee/AddEmployee";
import {
  Appointments,
  BookingDataType,
  GetEmployees,
  GetServices,
} from "../types/types";
import api from "../utils/api";

// Appointments
export const bookAppointment = async (bookingData: BookingDataType) => {
  const response = await api.post("/reservations/appointments/", bookingData);
  return response.data;
};

export const getUserBookings = async (): Promise<Appointments> => {
  const response = await api.get("/reservations/appointments/");
  return response.data;
};

// Services
export const getServices = async (): Promise<GetServices> => {
  const response = await api.get("/business/services/");
  return response.data;
};

// Employees
export const getEmployees = async (): Promise<GetEmployees> => {
  const response = await api.get("/business/employees/");
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<NewEmployee> => {
  const response = await api.get(`/business/employees/${id}`);
  return response.data;
};

export const addEmployee = async (
  newEmployee: Omit<NewEmployee, "id">
): Promise<NewEmployee> => {
  const response = await api.post("/business/employees/", newEmployee);
  return response.data;
};

export const updateEmployee = async (
  id: number,
  updatedEmployee: NewEmployee
): Promise<NewEmployee> => {
  const response = await api.put(`/business/employees/${id}/`, updatedEmployee);
  return response.data;
};

export const removeEmployee = async (id: number) => {
  const response = await api.delete(`/business/employees/${id}/`);
  return response.data;
};
