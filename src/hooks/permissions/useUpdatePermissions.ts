import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionsRequest } from "../../types/permissions";
import { updatePermissions } from "../../services/permissions/updatePermissions";

export const useUpdatePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PermissionsRequest }) =>
      updatePermissions(id, [data]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions-list"] });
    },
  });
};
