import api from "../../utils/api";

// interface UpdateUserInput {
//   id: number;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   password: string;
//   image: string;
//   is_owner: boolean;
//   is_superuser: boolean;
//   is_active: boolean;
//   is_staff: boolean;
//   groups: number[];
//   user_permissions: number[];
// }

interface UpdateUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  image: string;
  is_owner: boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_staff: boolean;
  groups: number[];
  user_permissions: number[];
  last_login: string | null;
}

export const updateUser = async (data: {
  id: number;
  userData: FormData;
}): Promise<UpdateUserResponse> => {
  const response = await api.put(
    `/dashboard/users/${data.id}/update/`,
    data.userData
  );
  return response.data;
};
