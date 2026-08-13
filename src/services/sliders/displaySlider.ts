import { SliderResponse } from "../../types/sliders";
import api from "../../utils/api";

export const displaySlider = async (
  randomCode: string,
): Promise<SliderResponse> => {
  const code = randomCode.trim();
  if (!code) return [];

  const response = await api.get(`/sliders/user/${encodeURIComponent(code)}/`);
  return response.data;
};
