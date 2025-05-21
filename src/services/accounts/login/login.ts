import { LoginType } from "../../../types/login";
import api from "../../../utils/api";

export const login = async (credentials: LoginType) => {
  const response = await api.post("/accounts/login/", credentials);
  return response.data;
};
