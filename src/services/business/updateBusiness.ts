import api from "../../utils/api";
import { BusinessRequest, BusinessResponse } from "../../types/business";

export const updateBusiness = async (
  id: number,
  data: Partial<BusinessRequest>,
): Promise<BusinessResponse> => {
  const response = await api.patch(`/business/${id}/`, data);
  return response.data;
};
