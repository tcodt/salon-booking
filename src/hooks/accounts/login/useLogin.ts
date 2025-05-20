import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
// import { storeAuthTokens } from "../../../utils/tokenHelper";
import { loginUser } from "../../../services/authService";
import { AxiosError } from "axios";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      //   storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
      login({ access: data.access, refresh: data.refresh }, data.user);
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
