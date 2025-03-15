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
