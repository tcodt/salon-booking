import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/users/updateUser";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
