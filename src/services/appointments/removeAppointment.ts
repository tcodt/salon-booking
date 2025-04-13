import api from "../../utils/api";

export const removeAppointment = async (id: number) => {
  const response = await api.delete(`/reservations/appointments/${id}/`);
  return response.data;
};
