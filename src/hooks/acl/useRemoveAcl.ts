import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAcl } from "../../services/acl/removeAcl";

export const useRemoveAcl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAcl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["acl"] });
    },
  });
};
