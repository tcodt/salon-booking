import { useQuery } from "@tanstack/react-query";
import { getPermissionsById } from "../../services/permissions/getPermissionsById";

export const useGetPermissionsById = (id: number) => {
  return useQuery({
    queryKey: ["permissions-list", id],
    queryFn: () => getPermissionsById(id),
    enabled: !!id,
  });
};
