import { useMutation } from "@tanstack/react-query";
import { addSlots } from "../../services/slots/addSlots";

export const useAddSlots = () => {
  return useMutation({
    mutationFn: addSlots,
  });
};
