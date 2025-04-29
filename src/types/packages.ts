export interface Packages {
  id: number;
  business_name: string;
  name: string;
  services: number[];
  desc: string;
  total_price: string;
  image: string;
  media_files: string;
}

export type PackagesArr = Packages[];

export interface AddPackage {
  business?: number;
  name: string;
  desc: string;
  services: number[];
  total_price: string;
  image: File | null;
  media_files?: File | null;
}
