export interface UserRegisterType {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface UserLoginType {
  phone_number: string;
  password: string;
}

export interface ChangePasswordDataType {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface BookingDataType {
  date: string;
  time: string;
  service_id: number;
  status: string;
  user: number;
  employee_id: number;
  get_status?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  image: string;
  is_active: boolean;
  is_owner: boolean;
  is_staff: boolean;
}

export interface Employee {
  id: number;
  user: User;
  skill: string;
}

export interface Business {
  id: number;
  name: string;
  business_type: string; // Or enum if you have specific types
  address: string;
  telephone_number: string;
  phone_number: string;
  is_coffee_shop: boolean;
  is_parking: boolean;
  instagram_link: string;
  owner: number;
}

export interface GetServicesItem {
  id: number;
  business: Business; // Changed from number to Business object
  employee: Employee; // Changed from number to Employee object
  name: string;
  description: string;
  duration: string;
  price: string;
}

export type GetServices = GetServicesItem[];

export type GetEmployees = GetEmployeesItem[];
export interface GetEmployeesItem {
  id: number;
  skill: string;
  user: User;
}

export enum AppointmentStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
  Completed = "completed",
}

export interface Appointment {
  date: string;
  time: string;
  status: AppointmentStatus;
  user: number;
  service: GetServicesItem;
  employee: GetEmployeesItem;
  get_status: string;
}

export type Appointments = Appointment[];
