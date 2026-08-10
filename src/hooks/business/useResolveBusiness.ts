import { useMutation } from "@tanstack/react-query";
import { resolveBusiness } from "../../services/business/resolveBusiness";

export const useResolveBusiness = () => {
  return useMutation({
    mutationFn: (code: string) => resolveBusiness(code),
  });
};
