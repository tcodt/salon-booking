import { useQuery } from "@tanstack/react-query";
import { getDashboardToday } from "../../services/dashboard/getDashboardToday";

export const useGetDashboardToday = () => {
  return useQuery({
    queryKey: ["dashboard-today"],
    queryFn: getDashboardToday,
  });
};
