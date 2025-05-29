import api from "../../utils/api";

export const removeUser = async (userId: number) => {
  const response = await api.delete(`/dashboard/users/${userId}/delete/`);
  return response.data;
};
