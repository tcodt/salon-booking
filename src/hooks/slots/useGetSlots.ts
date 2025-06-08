import { useQuery } from "@tanstack/react-query";
import { getSlots } from "../../services/slots/getSlots";

export const useGetSlots = () => {
  return useQuery({
    queryKey: ["slots"],
    queryFn: getSlots,
  });
};
