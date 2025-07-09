import { useQuery } from "@tanstack/react-query";
import { getUserPermissions } from "../../services/permissions/getUserPermissions";

export const useGetUserPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getUserPermissions,
    enabled: !!localStorage.getItem("accessToken"),
  });
};
