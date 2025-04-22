import { useMutation } from "@tanstack/react-query";
import { addWorkingTime } from "../../services/working-time/addWorkingTime";

export const useAddWorkingTime = () => {
  return useMutation({
    mutationFn: addWorkingTime,
  });
};
