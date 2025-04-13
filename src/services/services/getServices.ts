import { GetServicesItem } from "../../types/services";
import api from "../../utils/api";

export const getServices = async (): Promise<GetServicesItem> => {
  const response = await api.get("/business/services/");
  return response.data;
};
