import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAcl } from "../../services/acl/addAcl";

export const useAddAcl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAcl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["acl"] });
    },
  });
};
