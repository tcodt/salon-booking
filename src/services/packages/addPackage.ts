// import { Packages } from "../../types/packages";
import api from "../../utils/api";

export const addPackage = async (data: FormData) => {
  const response = await api.post("/packages/create/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
