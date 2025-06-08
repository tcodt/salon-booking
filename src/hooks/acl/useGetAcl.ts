import { useQuery } from "@tanstack/react-query";
import { getAcl } from "../../services/acl/getAcl";

export const useGetAcl = (id: number) => {
  return useQuery({
    queryKey: ["acl"],
    queryFn: () => getAcl(id),
  });
};
