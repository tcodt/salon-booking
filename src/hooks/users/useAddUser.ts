import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../services/users/addUser";

export const useAddUser = () => {
  return useMutation({
    mutationFn: addUser,
  });
};
