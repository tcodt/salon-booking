import { AddPackage, Packages } from "../../types/packages";
import api from "../../utils/api";

export const updatePackage = async (data: {
  id: number;
  values: AddPackage;
}): Promise<Packages> => {
  const response = await api.put(`/packages/${data.id}/`, data.values);
  return response.data;
};
