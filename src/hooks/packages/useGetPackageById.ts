import { useQuery } from "@tanstack/react-query";
import { getPackageById } from "../../services/packages/getPackageById";

export const useGetPackageById = (id: number) => {
  return useQuery({
    queryKey: ["packages", id],
    queryFn: () => getPackageById(id),
    enabled: !!id,
  });
};
