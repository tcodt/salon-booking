import { RegisterType } from "../../../types/register";
import api from "../../../utils/api";

export const register = async (userData: RegisterType) => {
  const response = await api.post("/accounts/register/", userData);
  return response.data;
};
