import api from "../../utils/api";

export const cancelAppointment = async (id: number) => {
  try {
    const response = await api.post(`/reservations/appointments/${id}/cancel/`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
