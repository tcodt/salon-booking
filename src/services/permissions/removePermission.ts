import api from "../../utils/api";

export const removePermission = async (id: number) => {
  try {
    const response = await api.delete(`/acl/permissions/${id}/`);
    return response.data;
  } catch (error) {
    console.log("خطا در حذف مجوز", error);
  }
};
