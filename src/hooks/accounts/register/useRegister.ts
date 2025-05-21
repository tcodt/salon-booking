import { useMutation } from "@tanstack/react-query";
import { register } from "../../../services/accounts/register/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
