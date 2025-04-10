import { GetServices } from "../../types/types";
import api from "../../utils/api";

export const getServiceById = async (id: number): Promise<GetServices> => {
  const response = await api.get(`/business/services/${id}`);
  return response.data;
};
