import { useMutation } from "@tanstack/react-query";
import { addEmployee } from "../../services/employees/addEmployee";

export const useAddEmployee = () => {
  return useMutation({
    mutationFn: addEmployee,
  });
};
