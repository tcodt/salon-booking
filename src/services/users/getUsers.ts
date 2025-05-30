import { Users } from "../../types/users";
import api from "../../utils/api";

export const getUsers = async (): Promise<Users> => {
  const response = await api.get("/dashboard/users/");
  return response.data;
};
