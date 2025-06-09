// import { storeAuthTokens } from "../../../utils/tokenHelper";
import { useMutation } from "@tanstack/react-query";
import { login as loginFn } from "../../../services/accounts/login/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginFn,
  });
};
