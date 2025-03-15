import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
    },
    onError: (error: AxiosError) => {
      console.log("Login error: ", error);
      if (error.response?.status === 401) {
        console.log("شماره تلفن یا رمز عبور اشتباه است!");
      } else {
        console.log("خطای ناشناخته‌ای رخ داده است:", error.message);
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      console.log("Password changed successfully!");
    },
    onError: (error: AxiosError) => {
      console.log("Change password error: ", error);
      if (error.response?.status === 400) {
        console.log("رمز عبور قدیمی اشتباه است یا ورودی‌ها معتبر نیستند!");
      } else if (error.response?.status === 401) {
        console.log("لطفاً دوباره لاگین کنید!");
      } else {
        console.log("خطای ناشناخته:", error.message);
      }
    },
  });
};

// export const useUserProfile = () => {
//   return useQuery(["userProfile"], fetchUserProfile);
// };

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    logoutUser();
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };
};
