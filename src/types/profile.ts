export interface GetProfile {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  image: string;
  is_owner: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

export type UpdateProfile = Omit<
  GetProfile,
  "id" | "created_at" | "updated_at"
>;
