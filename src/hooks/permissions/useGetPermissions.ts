import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../../services/permissions/getPermissions";

export const useGetPermissions = () => {
  return useQuery({
    queryKey: ["permissions-list"],
    queryFn: getPermissions,
  });
};
