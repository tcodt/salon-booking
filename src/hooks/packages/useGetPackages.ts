import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../../services/packages/getPackages";

export const useGetPackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });
};
