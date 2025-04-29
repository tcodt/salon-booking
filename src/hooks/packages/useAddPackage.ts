import { useMutation } from "@tanstack/react-query";
import { addPackage } from "../../services/packages/addPackage";

export const useAddPackage = () => {
  return useMutation({
    mutationFn: addPackage,
  });
};
