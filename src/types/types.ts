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

export type GetServices = GetServicesItem[];
export interface GetServicesItem {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  business: number;
  employee: number;
}

export type GetEmployees = GetEmployeesItem[];
export interface GetEmployeesItem {
  id: number;
  skill: string;
  user: number;
}
