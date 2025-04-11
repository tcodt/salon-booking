import { ChangePasswordType } from "../types/change-password-type";
import { LoginType } from "../types/login";
import { RegisterType } from "../types/register";
import api from "../utils/api";
import { clearAuthTokens } from "../utils/tokenHelper";

export const registerUser = async (userData: RegisterType) => {
  const response = await api.post("/accounts/register/", userData);
  return response.data;
};

export const loginUser = async (credentials: LoginType) => {
  const response = await api.post("/accounts/login/", credentials);
  return response.data;
};

export const changePassword = async (data: ChangePasswordType) => {
  const response = await api.post("/accounts/change-password/", data);
  return response.data;
};

export const logoutUser = async () => {
  clearAuthTokens();
};
