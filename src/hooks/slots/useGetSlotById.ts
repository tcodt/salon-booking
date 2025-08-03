import { useQuery } from "@tanstack/react-query";
import { getSlotById } from "../../services/slots/getSlotById";

export const useGetSlotById = (id: number) => {
  return useQuery({
    queryKey: ["slots", id],
    queryFn: () => getSlotById(id),
  });
};
