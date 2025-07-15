import { SlotsResponse } from "../../types/slots";
import api from "../../utils/api";

export const getSlotById = async (id: number): Promise<SlotsResponse> => {
  try {
    const response = await api.get(`/business/slots/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching slots by id: ", error);
    throw error;
  }
};
