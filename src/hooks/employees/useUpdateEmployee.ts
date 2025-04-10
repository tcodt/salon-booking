import { useMutation } from "@tanstack/react-query";
import { updateEmployee } from "../../services/employees/updateEmployee";

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: updateEmployee,
  });
};
