import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../../services/employees/getEmployeeById";

export const useEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
};
