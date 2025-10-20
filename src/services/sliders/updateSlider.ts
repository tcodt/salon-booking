import { SliderItems } from "../../types/sliders";
import api from "../../utils/api";

export const updateSlider = async (
  data: Pick<SliderItems, "id" | "title" | "sub_title" | "is_active"> | FormData
): Promise<SliderItems> => {
  let id: number;
  if (data instanceof FormData) {
    const idValue = data.get("id");
    if (!idValue) throw new Error("ID is required in FormData");
    id = Number(idValue);
  } else {
    id = data.id;
  }
  const response = await api.put(`/sliders/${id}/`, data);
  return response.data;
};
