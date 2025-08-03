import { useQuery } from "@tanstack/react-query";
import { removeSlots } from "../../services/slots/removeSlots";

export const useRemoveSlots = (id: number) => {
  return useQuery({
    queryKey: ["slots", id],
    queryFn: () => removeSlots(id),
  });
};
