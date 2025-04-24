import { useMutation } from "@tanstack/react-query";
import { updateWorkingTime } from "../../services/working-time/updateWorkingTime";

export const useUpdateWorkingTime = () => {
  return useMutation({
    mutationFn: updateWorkingTime,
  });
};
