import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeUserPermissions } from "../../services/permissions/removeUserPermissions";

export const useRemoveUserPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeUserPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};
