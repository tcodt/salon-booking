import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const displayPackages = async (
  randomCode: string,
): Promise<Packages[]> => {
  const code = randomCode.trim();
  if (!code) return [];

  const response = await api.get(`/packages/user/${encodeURIComponent(code)}/`);
  return response.data;
};
