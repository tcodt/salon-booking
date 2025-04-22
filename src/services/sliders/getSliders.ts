import { SliderResponse } from "../../types/sliders";
import api from "../../utils/api";

export const getSliders = async (): Promise<SliderResponse> => {
  const response = await api.get("/sliders/");
  return response.data;
};
