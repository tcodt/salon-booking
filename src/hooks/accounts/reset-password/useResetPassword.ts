import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/accounts/reset-password/resetPassword";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
