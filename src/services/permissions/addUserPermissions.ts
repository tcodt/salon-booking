import {
  UserPermissionRequest,
  UserPermissionResponse,
} from "../../types/permissions";
import api from "../../utils/api";

export const addUserPermissions = async (
  data: UserPermissionRequest
): Promise<UserPermissionResponse> => {
  try {
    const response = await api.post("/acl/user-permissions/create/", data);
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد مجوز:", error);
    throw error;
  }
};
