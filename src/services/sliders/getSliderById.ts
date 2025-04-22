import { SliderItems } from "../../types/sliders";
import api from "../../utils/api";

export const getSliderById = async (id: number): Promise<SliderItems> => {
  const response = await api.get(`/sliders/${id}/`);
  return response.data;
};
