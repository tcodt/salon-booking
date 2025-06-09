import { useQuery } from "@tanstack/react-query";
import { getAcl } from "../../services/acl/getAcl";

export const useGetAcl = () => {
  return useQuery({
    queryKey: ["acl"],
    queryFn: getAcl,
  });
};
