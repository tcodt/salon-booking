import { Business } from "../../types/business";
import api from "../../utils/api";

export const getBusinesses = async (): Promise<Business> => {
  const response = await api.get("/business/");
  return response.data;
};
