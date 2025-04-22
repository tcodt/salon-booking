import api from "../../utils/api";

export const removeWorkingTime = async (id: number) => {
  const response = await api.delete(`/working_hours/${id}/`);
  return response.data;
};
