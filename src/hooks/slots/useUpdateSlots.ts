import { useMutation } from "@tanstack/react-query";
import { updateSlots } from "../../services/slots/updateSlots";

export const useUpdateSlots = () => {
  return useMutation({
    mutationFn: updateSlots,
  });
};
