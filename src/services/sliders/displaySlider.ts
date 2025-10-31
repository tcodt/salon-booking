import { SliderResponse } from "../../types/sliders";
import api from "../../utils/api";

export const displaySlider = async (): Promise<SliderResponse> => {
  const response = await api.get("/sliders/user/");
  return response.data;
};
