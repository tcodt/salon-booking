import {
  UserPermissionRequest,
  UserPermissionResponse,
} from "../../types/permissions";
import api from "../../utils/api";

export const updateUserPermissions = async (
  id: number,
  data: UserPermissionRequest
): Promise<UserPermissionResponse> => {
  try {
    const response = await api.put(`/acl/user-permissions/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("خطا در به‌روزرسانی مجوز:", error);
    throw error;
  }
};
