import { useQuery } from "@tanstack/react-query";
import { getSliders } from "../../services/sliders/getSliders";

export const useGetSliders = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: getSliders,
  });
};
