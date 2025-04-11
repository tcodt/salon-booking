import { useMutation } from "@tanstack/react-query";
import { addService } from "../../services/services/addService";

export const useAddService = () => {
  return useMutation({
    mutationFn: addService,
  });
};
