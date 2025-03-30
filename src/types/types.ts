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
  service: string;
  status: string;
  user: number;
  employee?: string;
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
