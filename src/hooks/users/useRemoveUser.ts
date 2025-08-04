import { useMutation } from "@tanstack/react-query";
import { removeUser } from "../../services/users/removeUser";

export const useRemoveUser = () => {
  return useMutation({
    mutationFn: removeUser,
  });
};
