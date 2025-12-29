import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../../services/appointments/cancelAppointment";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useCancelAppointment = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelAppointment(id),
    onSuccess: () => {
      toast.success("رزرو با موفقیت لغو شد!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        toast.error("این رزرو قبلاً لغو شده است.");
        return;
      }
      toast.error("خطا در لغو رزرو. لطفاً دوباره تلاش کنید.");
      console.log("Error while canceling the reserve: ", error);
    },
  });
};
