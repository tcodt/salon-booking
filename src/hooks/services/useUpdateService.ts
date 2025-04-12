import { useMutation } from "@tanstack/react-query";
import { updateService } from "../../services/services/updateService";

export const useUpdateService = () => {
  return useMutation({
    mutationFn: updateService,
  });
};
