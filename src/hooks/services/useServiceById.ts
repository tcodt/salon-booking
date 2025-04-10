import { useQuery } from "@tanstack/react-query";
import { getServiceById } from "../../services/services/getServiceById";

export const useServiceById = (id: number) => {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};
