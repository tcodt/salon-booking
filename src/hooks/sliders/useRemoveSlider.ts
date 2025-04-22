import { useMutation } from "@tanstack/react-query";
import { removeSlider } from "../../services/sliders/removeSlider";

export const useRemoveSlider = () => {
  return useMutation({
    mutationFn: removeSlider,
  });
};
