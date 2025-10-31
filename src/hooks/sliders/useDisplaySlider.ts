import { useQuery } from "@tanstack/react-query";
import { displaySlider } from "../../services/sliders/displaySlider";

export const useDisplaySlider = () => {
  return useQuery({
    queryKey: ["sliders-user"],
    queryFn: displaySlider,
  });
};
