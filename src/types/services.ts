import { BusinessItem } from "./business";
import { Employee } from "./employees";

export interface GetServicesItem {
  id: number;
  business: BusinessItem;
  employee: Employee;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export type GetServices = GetServicesItem[];

export type PostServicesData = {
  name: string;
  price: string;
  description: string;
  duration: string;
  business_id: number;
  employee_id: number;
};
