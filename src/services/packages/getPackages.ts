import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const getPackages = async (): Promise<Packages[]> => {
  const response = await api.get("/packages/");
  return response.data;
};
