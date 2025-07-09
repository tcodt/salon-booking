import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserPermissions } from "../../services/permissions/addUserPermissions";

export const useAddUserPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};
