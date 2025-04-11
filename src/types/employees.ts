import { User } from "./users";

export interface Employee {
  id: number;
  user: User;
  skill: string;
}

export interface GetEmployeesItem {
  id: number;
  skill: string;
  user: User;
}
export type GetEmployees = GetEmployeesItem[];

export type NewEmployeeType = {
  user_id: number;
  skill: string;
};

export interface NewEmployeeUserObj {
  id: number;
  name: string;
  phone: string;
}

export type NewEmployeePromiseType = {
  id: number;
  user: NewEmployeeUserObj;
  skill: string;
};
