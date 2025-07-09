import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPermission } from "../../services/permissions/addPermission";

export const useAddPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions-list"] });
    },
  });
};
