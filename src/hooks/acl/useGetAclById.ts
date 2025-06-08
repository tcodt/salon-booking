import { useQuery } from "@tanstack/react-query";
import { getAclById } from "../../services/acl/getAclById";

export const useGetAclById = (id: number) => {
  return useQuery({
    queryKey: ["acl", id],
    queryFn: () => getAclById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 دقیقه کش
    retry: 1,
  });
};
