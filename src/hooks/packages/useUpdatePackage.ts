import { useMutation } from "@tanstack/react-query";
import { updatePackage } from "../../services/packages/updatePackage";

export const useUpdatePackage = () => {
  return useMutation({
    mutationFn: updatePackage,
  });
};
