import axios, { AxiosError } from "axios";
import { clearAuthTokens } from "./tokenHelper";

const api = axios.create({
  baseURL: "https://api.narjin.ir",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    if (status === 401) {
      clearAuthTokens();
      window.location.href = "/login";
    }

    if (
      status === 400 &&
      (url.includes("/register") || url.includes("/login"))
    ) {
      clearAuthTokens();
    }

    return Promise.reject(error);
  }
);

export default api;
