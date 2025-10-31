import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const displayPackages = async (): Promise<Packages[]> => {
  const response = await api.get("/packages/user/");
  return response.data;
};
