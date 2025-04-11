import { useQuery } from "@tanstack/react-query";
import { getWorkTime } from "../../services/work-time/work-time";

export const useGetWorkTime = () => {
  return useQuery({
    queryKey: ["work_time"],
    queryFn: getWorkTime,
  });
};
