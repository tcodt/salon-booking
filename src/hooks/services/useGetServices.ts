import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../services/services/getServices";

export const useGetServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};
