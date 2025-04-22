import { useMutation } from "@tanstack/react-query";
import { addSlider } from "../../services/sliders/addSlider";

export const useAddSlider = () => {
  return useMutation({
    mutationFn: addSlider,
  });
};
