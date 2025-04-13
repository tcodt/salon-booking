import { ServicesItem } from "../../types/services";
import api from "../../utils/api";

export const getServiceById = async (id: number): Promise<ServicesItem> => {
  const response = await api.get(`/business/services/${id}`);
  return response.data;
};
