import { useMutation } from "@tanstack/react-query";
import { removeService } from "../../services/services/removeService";

export const useRemoveService = () => {
  return useMutation({
    mutationFn: removeService,
  });
};
