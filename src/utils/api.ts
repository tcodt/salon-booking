import axios from "axios";
import { clearAuthTokens } from "./tokenHelper";

const api = axios.create({
  baseURL: "https://queuingprojectapi.pythonanywhere.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthTokens();
      window.location.href = "/login";
    }

    if (
      error.response.status === 400 &&
      error.config.url &&
      (error.config.url.includes("/register") ||
        error.config.url.includes("/login"))
    ) {
      clearAuthTokens();
    }
    return Promise.reject(error);
  }
);

export default api;
