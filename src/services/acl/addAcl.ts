import { CreateAclRequest, CreateAclResponse } from "../../types/acl";
import api from "../../utils/api";

export const addAcl = async (
  data: CreateAclRequest
): Promise<CreateAclResponse> => {
  try {
    const response = await api.post("/acl/user-permissions/create/", data);
    return response.data as CreateAclResponse;
  } catch (error) {
    console.error("خطا در ایجاد مجوز:", error);
    throw error;
  }
};
