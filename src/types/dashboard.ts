/* eslint-disable @typescript-eslint/no-explicit-any */

// Common types
type Appointment = {
  id: number;
  status: string; // Could be more specific if possible values are known
  user: number;
  service: Service;
  employee: Employee;
  get_status: string;
  employee_name: string;
};

type Service = {
  id: number;
  name: string;
  price: string;
  description: string;
  duration: string;
  business: Business;
  employee: Employee;
};

type Business = {
  id: number;
  name: string;
  business_type: string;
  address: string;
  telephone_number: string;
  phone_number: string;
  is_coffee_shop: boolean;
  is_parking: boolean;
  instagram_link: string;
  owner: number;
};

type Employee = {
  id: number;
  user: User;
  skill: string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_owner: boolean;
  is_active: boolean;
  is_staff: boolean;
  image: null | string;
};

type NewUser = {
  id: number;
  phone_number: string;
  created_at: string; // ISO date string
};

type Payment = any; // Replace with proper type if payment structure is known

// Dashboard response types
export type AdminDashboardResponse = {
  type: "admin";
  total_appointments: number;
  appointments: Appointment[];
  today_appointments: number;
  income: {
    today: number;
    week: number;
    month: number;
  };
  active_users: number;
  recent_payments: Payment[];
  new_users: NewUser[];
};

export type UserDashboardResponse = {
  type: "user";
  last_appointments: Appointment[];
  last_payments: Payment[];
  next_appointment: Appointment | null;
  total_appointments: number;
  unpaid_reminder: boolean;
};

// Union type for all possible dashboard responses
export type DashboardResponse = AdminDashboardResponse | UserDashboardResponse;
