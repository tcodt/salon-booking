import { useMutation } from "@tanstack/react-query";
import { removeEmployee } from "../../services/employees/removeEmployee";

export const useRemoveEmployee = () => {
  return useMutation({
    mutationFn: removeEmployee,
  });
};
