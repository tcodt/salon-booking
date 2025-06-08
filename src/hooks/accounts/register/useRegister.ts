import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { registerFn } from "../../../services/accounts/register/registerFn";
import { storeAuthTokens } from "../../../utils/tokenHelper";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
      loginContext({ access: data.access, refresh: data.refresh }, data.user);
      navigate("/");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      toast.error("خطایی رخ داد! دوباره تلاش کنید");
    },
  });
};
