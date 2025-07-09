import { PermissionsRequest } from "../../types/permissions";
import api from "../../utils/api";

export const updatePermissions = async (
  id: number,
  data: PermissionsRequest[]
) => {
  try {
    const response = await api.put(`/acl/permissions/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("خطا در به‌روزرسانی مجوزها", error);
  }
};
