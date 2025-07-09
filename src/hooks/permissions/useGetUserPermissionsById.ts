import { useQuery } from "@tanstack/react-query";
import { getUserPermissionsById } from "../../services/permissions/getUserPermissionsById";

export const useGetUserPermissionsById = (id: number) => {
  return useQuery({
    queryKey: ["permissions", id],
    queryFn: () => getUserPermissionsById(id),
    enabled: id > 0,
  });
};
