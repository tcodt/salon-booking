import { User } from "../../types/users";
import api from "../../utils/api";

export const getUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/dashboard/users/${userId}/`);
  return response.data;
};
