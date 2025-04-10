import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../services/employees/getEmployees";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};
