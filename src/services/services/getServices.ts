import { GetServices } from "../../types/services";
import api from "../../utils/api";

export const getServices = async (): Promise<GetServices> => {
  const response = await api.get("/business/services/");
  return response.data;
};
