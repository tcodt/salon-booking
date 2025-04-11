import { PostServicesData } from "../../types/services";
import api from "../../utils/api";

export const addService = async (serviceData: PostServicesData) => {
  const response = await api.post("/business/services/", serviceData);
  return response.data;
};
