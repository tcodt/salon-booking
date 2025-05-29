import api from "../../utils/api";

export const updateUser = async (userId: number) => {
  const response = await api.put(`/dashboard/users/${userId}/update/`);
  return response.data;
};
