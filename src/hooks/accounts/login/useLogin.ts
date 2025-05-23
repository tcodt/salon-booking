import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
// import { storeAuthTokens } from "../../../utils/tokenHelper";
import { AxiosError } from "axios";
import { login as loginFn } from "../../../services/accounts/login/login";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      //   storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
      loginContext({ access: data.access, refresh: data.refresh }, data.user);
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
