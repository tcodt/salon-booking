import axios, { AxiosError } from "axios";
import { clearAuthTokens } from "./tokenHelper";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://queuingprojectapi.pythonanywhere.com",
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

    // Only force logout on 401 for protected endpoints
    if (status === 401) {
      const isAuthEndpoint =
        url.includes("/login") ||
        url.includes("/register") ||
        url.includes("/token");

      if (!isAuthEndpoint) {
        clearAuthTokens();
        // Prefer router navigation if you later move this into a React context.
        // For now keep the hard redirect so the app recovers cleanly.
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
