import { useMutation } from "@tanstack/react-query";
import { updateSlider } from "../../services/sliders/updateSlider";

export const useUpdateSlider = () => {
  return useMutation({
    mutationFn: updateSlider,
  });
};
