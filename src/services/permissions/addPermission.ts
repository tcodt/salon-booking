import { PermissionsResponse } from "../../types/permissions";
import api from "../../utils/api";

export const addPermission = async (data: {
  name: string;
  code: string;
  description: string;
}): Promise<PermissionsResponse[]> => {
  try {
    const response = await api.post("/acl/permissions/", data);
    return response.data;
  } catch (error) {
    console.log("خطا در افزودن مجوز", error);
    return [];
  }
};
