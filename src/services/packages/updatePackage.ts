import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const updatePackage = async (data: {
  id: number;
  formData: FormData;
}): Promise<Packages> => {
  const response = await api.put(
    `/packages/${data.id}/update/`,
    data.formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
