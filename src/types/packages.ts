import { Business, BusinessItem } from "./business";

export interface Packages {
  business: BusinessItem;
  id: number;
  business_name: string;
  name: string;
  services: {
    id: number;
    name: string;
    price: string;
    description: string;
    duration: string;
    business: Business;
  }[];
  desc: string;
  total_price: string;
  image?: string;
  media_files?: string;
}

export type PackagesArr = Packages[];

export interface AddPackage {
  business_id: number;
  name: string;
  desc: string;
  service_ids: number[];
  total_price: string;
  image?: File | null;
  media_files?: File | null;
}
