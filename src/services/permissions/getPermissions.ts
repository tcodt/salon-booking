import { PermissionsResponse } from "../../types/permissions";
import api from "../../utils/api";

export const getPermissions = async (): Promise<PermissionsResponse[]> => {
  try {
    const response = await api.get("/acl/permissions/");
    return response.data;
  } catch (error) {
    console.log("خطا در دریافت لیست مجوزها", error);
    return [];
  }
};
