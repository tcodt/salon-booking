import { SlotsRequest } from "../../types/slots";
import api from "../../utils/api";

export const updateSlots = async (data: {
  updateSlot: SlotsRequest;
  id: number;
}) => {
  try {
    const response = await api.put(
      `/business/slots/${data.id}/`,
      data.updateSlot
    );
    return response.data;
  } catch (error) {
    console.log("Error while updating the slot: ", error);
    throw error;
  }
};
