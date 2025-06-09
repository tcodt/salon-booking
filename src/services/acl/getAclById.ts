import { CreateAclResponse } from "../../types/acl";
import api from "../../utils/api";

export const getAclById = async (id: number): Promise<CreateAclResponse> => {
  try {
    const response = await api.get(`/acl/user-permissions/${id}/`);
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن مجوز:", error);
    throw error;
  }
};
