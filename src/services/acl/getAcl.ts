import { AxiosResponse } from "axios";
import { AclResponse, AclResponseArray } from "../../types/acl";
import api from "../../utils/api";

export const getAcl = async (userId: number): Promise<AclResponseArray> => {
  try {
    const response: AxiosResponse<AclResponseArray> = await api.get(
      "/acl/user-permissions/"
    );

    const userAcl = response.data.filter(
      (user: AclResponse) => user.id === userId
    );

    if (!userAcl) {
      throw new Error(`User with ID ${userId} not found in ACL list`);
    }

    return (
      userAcl || {
        id: userId,
        first_name: "",
        last_name: "",
        phone_number: "",
        permissions: [],
      }
    );
  } catch (error) {
    console.error("خطا در دریافت مجوزهای کاربران:", error);
    throw error;
  }
};
