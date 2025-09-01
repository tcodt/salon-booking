import { useMutation } from "@tanstack/react-query";
import { removeSlots } from "../../services/slots/removeSlots";

export const useRemoveSlots = () => {
  return useMutation({
    mutationFn: removeSlots,
  });
};
