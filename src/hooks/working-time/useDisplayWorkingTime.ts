import { useQuery } from "@tanstack/react-query";
import { displayWorkingTime } from "../../services/working-time/displayWorkingTime";

export const useDisplayWorkingTime = () => {
  return useQuery({
    queryKey: ["working_time_user"],
    queryFn: displayWorkingTime,
  });
};
