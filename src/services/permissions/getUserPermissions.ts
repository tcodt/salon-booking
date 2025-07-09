import api from "../../utils/api";

interface UserPermissionResponse {
  id_user_permission: number;
  permissions: {
    id: number;
    name: string;
    code: string;
  };
  users: {
    name: string;
    phone_number: string;
  };
}

export const getUserPermissions = async (): Promise<
  UserPermissionResponse[]
> => {
  try {
    const response = await api.get("/acl/user-permissions/");

    return response.data;
  } catch (error) {
    console.error("خطا در دریافت مجوزهای کاربران:", error);
    throw error;
  }
};
