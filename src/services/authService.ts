import {
  ChangePasswordDataType,
  UserLoginType,
  UserRegisterType,
} from "../types/types";
import api from "../utils/api";

export const registerUser = async (userData: UserRegisterType) => {
  const response = await api.post("/accounts/register/", userData);
  return response.data;
};

export const loginUser = async (credentials: UserLoginType) => {
  const response = await api.post("/accounts/login/", credentials);
  return response.data;
};

export const changePassword = async (data: ChangePasswordDataType) => {
  const response = await api.post("/accounts/change-password/", data);
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
