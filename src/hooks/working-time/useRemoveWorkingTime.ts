import { useMutation } from "@tanstack/react-query";
import { removeWorkingTime } from "../../services/working-time/removeWorkingTime";

export const useRemoveWorkingTime = () => {
  return useMutation({
    mutationFn: removeWorkingTime,
  });
};
