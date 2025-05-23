import api from "../../utils/api";

export const removePackage = async (id: number) => {
  const response = await api.delete(`/packages/${id}/delete/`);
  return response.data;
};
