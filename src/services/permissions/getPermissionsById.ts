import { PermissionsResponse } from "../../types/permissions";
import api from "../../utils/api";

export const getPermissionsById = async (
  id: number
): Promise<PermissionsResponse[]> => {
  try {
    const response = await api.get(`/acl/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.log("خطا در دریافت مجوز مورد نظر", error);
    return [];
  }
};
