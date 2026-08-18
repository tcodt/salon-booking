import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../services/employees/getEmployees";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";

/** Owner-only. Customers get employees from service.employee on Reserve. */
export const useGetEmployees = (options?: { enabled?: boolean }) => {
  const { isAuthenticated } = useAuth();
  const { userType } = useUserType();
  const isOwner = userType === "owner";

  return useQuery({
    queryKey: ["employees", "mine"],
    queryFn: getEmployees,
    enabled: options?.enabled ?? (isAuthenticated && isOwner),
    retry: false,
  });
};
