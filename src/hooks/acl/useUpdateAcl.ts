import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAcl } from "../../services/acl/updateAcl";
import { CreateAclRequest } from "../../types/acl";

// type UpdateAclVariables = { id: number; data: { user: number; permissions: number[] } };

export const useUpdateAcl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user, permissions }: CreateAclRequest) =>
      updateAcl(user, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["acl"] });
    },
  });
};
