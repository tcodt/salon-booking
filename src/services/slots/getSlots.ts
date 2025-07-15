import { SlotsResponse } from "../../types/slots";
import api from "../../utils/api";

export const getSlots = async (): Promise<SlotsResponse[]> => {
  try {
    const response = await api.get("/business/slots/");
    return response.data;
  } catch (error) {
    console.log("Error while fetching the slots: ", error);
    throw error;
  }
};
