import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePermission } from "../../services/permissions/removePermission";

export const useRemovePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions-list"] });
    },
  });
};
