import { useQuery } from "@tanstack/react-query";
import { getSliderById } from "../../services/sliders/getSliderById";

export const useGetSliderById = (id: number) => {
  return useQuery({
    queryKey: ["sliders", id],
    queryFn: () => getSliderById(id),
    enabled: !!id,
  });
};
