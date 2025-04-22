import { useQuery } from "@tanstack/react-query";
import { getWorkingTimeById } from "../../services/working-time/getWorkingTimeById";

export const useGetWorkingTimeById = (id: number) => {
  return useQuery({
    queryKey: ["working-time", id],
    queryFn: () => getWorkingTimeById(id),
    enabled: !!id,
  });
};
