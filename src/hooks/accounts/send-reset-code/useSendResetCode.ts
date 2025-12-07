import { useMutation } from "@tanstack/react-query";
import { sendResetCode } from "../../../services/accounts/send-reset-code/sendResetCode";
import toast from "react-hot-toast";

export const useSendResetCode = () => {
  return useMutation({
    mutationFn: (phoneNumber: string) => sendResetCode(phoneNumber),
    onError: () => {
      toast.error("خطا در ارسال کد. دوباره تلاش کنید.");
    },
  });
};
