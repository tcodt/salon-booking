import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/accounts/login/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
