import { useQuery } from "@tanstack/react-query";
import { getBusinesses } from "../../services/business/getBusinesses";

export const useGetBusinesses = () => {
  return useQuery({
    queryKey: ["business"],
    queryFn: getBusinesses,
  });
};
