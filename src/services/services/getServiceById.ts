import { GetServicesItem } from "../../types/services";
import api from "../../utils/api";

export const getServiceById = async (id: number): Promise<GetServicesItem> => {
  const response = await api.get(`/business/services/${id}`);
  return response.data;
};
