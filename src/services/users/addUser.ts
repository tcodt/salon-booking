import { CreateUser } from "../../types/users";
import api from "../../utils/api";

export const addUser = async (newUser: CreateUser) => {
  const response = await api.post("/dashboard/users/", newUser);
  return response.data;
};
