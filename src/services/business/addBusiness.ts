import { BusinessRequest, BusinessResponse } from "../../types/business";
import api from "../../utils/api";

export const addBusiness = async (
  businessData: BusinessRequest,
): Promise<BusinessResponse> => {
  const response = await api.post("/business/create/", businessData);
  return response.data;
};
