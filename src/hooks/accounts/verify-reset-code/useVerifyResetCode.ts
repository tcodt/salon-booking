import { useMutation } from "@tanstack/react-query";
import { verifyResetCode } from "../../../services/accounts/verify-reset-code/verifyResetCode";

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: ({
      phoneNumber,
      code,
    }: {
      phoneNumber: string;
      code: string;
    }) => verifyResetCode({ phoneNumber, code }),
  });
};
