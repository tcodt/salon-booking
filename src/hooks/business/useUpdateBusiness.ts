import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBusiness } from "../../services/business/updateBusiness";
import { BusinessRequest } from "../../types/business";

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<BusinessRequest>;
    }) => updateBusiness(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-me"] });
    },
  });
};
