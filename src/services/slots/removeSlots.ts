import api from "../../utils/api";

export const removeSlots = async (id: number) => {
  try {
    const response = await api.delete(`/business/slots/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error while removing slot: ", error);
  }
};
