import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { UserPermissions } from "../../types/acl";

export const getAcl = async (): Promise<UserPermissions> => {
  try {
    const response: AxiosResponse<UserPermissions> = await api.get(
      "/acl/user-permissions/"
    );

    return response.data;
  } catch (error) {
    console.error("خطا در دریافت مجوزهای کاربران:", error);
    throw error;
  }
};
