import api from "../../utils/api";

export const removeService = async (id: number) => {
  const response = await api.delete(`/business/services/${id}`);
  return response.data;
};
