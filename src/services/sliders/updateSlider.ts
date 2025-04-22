import { SliderItems } from "../../types/sliders";
import api from "../../utils/api";

export const updateSlider = async (
  data: Pick<SliderItems, "id" | "title" | "sub_title" | "is_active">
): Promise<SliderItems> => {
  const response = await api.put(`/sliders/${data.id}/`, data);
  return response.data;
};
