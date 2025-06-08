import { SlotsResponse } from "../../types/slots";
import api from "../../utils/api";

export const getSlots = async (): Promise<SlotsResponse[]> => {
  const response = await api.get("/business/slots/");
  return response.data;
};
