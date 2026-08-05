import { GetProfile } from "../../types/profile";
import api from "../../utils/api";

export const updateProfile = async (
  profileData: FormData,
): Promise<GetProfile> => {
  const response = await api.patch(
    "/dashboard/users/profile/update/",
    profileData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
