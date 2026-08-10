import api from "../../utils/api";
import { BusinessMeResponse } from "../../types/business";

export const resolveBusiness = async (
  randomCode: string,
): Promise<BusinessMeResponse> => {
  const code = randomCode.trim().toUpperCase();
  const response = await api.post(`/business/resolve/${code}/`);
  return response.data;
};
