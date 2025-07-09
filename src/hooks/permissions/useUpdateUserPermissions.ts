import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPermissionRequest } from "../../types/permissions";
import { updateUserPermissions } from "../../services/permissions/updateUserPermissions";

// type UpdateAclVariables = { id: number; data: { user: number; permissions: number[] } };

export const useUpdateUserPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserPermissionRequest }) =>
      updateUserPermissions(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};
