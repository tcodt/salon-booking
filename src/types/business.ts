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

export type Business = BusinessItem[];
