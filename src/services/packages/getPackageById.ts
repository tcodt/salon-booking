import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const getPackageById = async (id: number): Promise<Packages> => {
  const response = await api.get(`/packages/${id}/`);
  return response.data;
};
