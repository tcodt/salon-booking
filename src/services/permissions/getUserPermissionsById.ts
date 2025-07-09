import { UserPermissionResponse } from "../../types/permissions";
import api from "../../utils/api";

export const getUserPermissionsById = async (
  id: number
): Promise<UserPermissionResponse> => {
  try {
    const response = await api.get(`/acl/user-permissions/${id}/`);
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن مجوز:", error);
    throw error;
  }
};
