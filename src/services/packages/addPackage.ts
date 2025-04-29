import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const addPackage = async (formData: FormData): Promise<Packages> => {
  const response = await api.post("/packages/", formData);
  return response.data;
};
