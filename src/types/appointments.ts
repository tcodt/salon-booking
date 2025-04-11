import { GetEmployeesItem } from "./employees";
import { GetServicesItem } from "./services";

export interface AppointmentDataType {
  date: string;
  time: string;
  service_id: number;
  status: string;
  user: number;
  employee_id: number;
  get_status?: string;
}

export enum AppointmentStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
  Completed = "completed",
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  user: number;
  service: GetServicesItem;
  employee: GetEmployeesItem;
  get_status: string;
}

export type Appointments = Appointment[];
