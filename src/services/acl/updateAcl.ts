import { CreateAclResponse } from "../../types/acl";
import api from "../../utils/api";

export const updateAcl = async (
  user: number,
  permissions: number[]
): Promise<CreateAclResponse> => {
  try {
    const response = await api.put(
      `/acl/user-permissions/${user}/`,
      permissions
    );
    return response.data as CreateAclResponse;
  } catch (error) {
    console.error("خطا در به‌روزرسانی مجوز:", error);
    throw error;
  }
};
