import api from "../../utils/api";

export const removeUserPermissions = async (id: number): Promise<void> => {
  try {
    await api.delete(`/acl/user-permissions/${id}/`);
  } catch (error) {
    console.error("خطا در حذف مجوز:", error);
    throw error;
  }
};
