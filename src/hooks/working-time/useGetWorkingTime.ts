import { useQuery } from "@tanstack/react-query";
import { getWorkingTime } from "../../services/working-time/getWorkingTime";

export const useGetWorkingTime = () => {
  return useQuery({
    queryKey: ["working_time"],
    queryFn: getWorkingTime,
  });
};
