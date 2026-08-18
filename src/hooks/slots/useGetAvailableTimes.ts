import { useQuery } from "@tanstack/react-query";
import { getAvailableTimes } from "../../services/slots/getAvailableTimes";

export const useGetAvailableTimes = (
  date: string | null | undefined,
  serviceId: number | null | undefined
) => {
  return useQuery({
    queryKey: ["available-times", date, serviceId],
    queryFn: () => getAvailableTimes(date!, serviceId!),
    enabled: !!date && !!serviceId && serviceId > 0,
    retry: false,
  });
};