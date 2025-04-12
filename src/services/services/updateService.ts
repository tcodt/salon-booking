import { PostServicesData } from "../../types/services";
import api from "../../utils/api";

export const updateService = async (data: {
  id: number;
  values: PostServicesData;
}) => {
  const response = await api.put(`/business/services/${data.id}/`, data.values);
  return response.data;
};
