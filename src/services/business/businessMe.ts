import { BusinessMeResponse } from "../../types/business";
import api from "../../utils/api";

export const businessMe = async (): Promise<BusinessMeResponse> => {
  const response = await api.get("/business/me/");
  return response.data;
};
