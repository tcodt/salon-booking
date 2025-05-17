import { GetProfile } from "../../types/profile";
import api from "../../utils/api";

export const getProfile = async (): Promise<GetProfile> => {
  const response = await api.get("/dashboard/users/profile/");
  return response.data;
};
