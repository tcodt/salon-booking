import { SlotsRequest, SlotsResponse } from "../../types/slots";
import api from "../../utils/api";

export const addSlots = async (
  newSlot: SlotsRequest
): Promise<SlotsResponse> => {
  try {
    const response = await api.post("/business/slots/create/", newSlot);
    return response.data;
  } catch (error) {
    console.log("Error while adding the slots: ", error);
    throw error;
  }
};
