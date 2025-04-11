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

export type Users = User[];
