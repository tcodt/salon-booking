import api from "../../utils/api";

export const removeEmployee = async (id: number) => {
  const response = await api.delete(`/business/employees/${id}/`);
  return response.data;
};
