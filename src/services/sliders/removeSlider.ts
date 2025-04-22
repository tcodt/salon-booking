import api from "../../utils/api";

export const removeSlider = async (id: number) => {
  const response = await api.delete(`/sliders/${id}/`);
  return response.data;
};
