export interface BusinessItem {
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
}

export interface BusinessResponse {
  id: number;
  name: string;
  slug: string;
  random_code: string;
  business_type: string;
  address: string;
  phone_number: string;
  is_active: boolean;
}

export interface BusinessRequest {
  name: string;
  slug: string;
  business_type: string;
  address: string;
  phone_number: string;
}

export type BusinessMeResponse = {
  id: number;
  name: string;
  slug: string;
  random_code: string;
  business_type: string;
  address: string;
  phone_number: string;
  is_active: boolean;
};

export type Business = BusinessItem[];
