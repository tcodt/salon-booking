import { useMutation } from "@tanstack/react-query";
import { removePackage } from "../../services/packages/removePackage";

export const useRemovePackage = () => {
  return useMutation({
    mutationFn: removePackage,
  });
};
