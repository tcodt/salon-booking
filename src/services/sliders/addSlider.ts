import { SliderItems } from "../../types/sliders";
import api from "../../utils/api";

type AddSliderType = Pick<SliderItems, "title" | "sub_title" | "is_active">;

export const addSlider = async (data: AddSliderType) => {
  const response = await api.post("/sliders/", data);
  return response.data;
};
