import { PostServicesData } from "../../types/services";
import api from "../../utils/api";

export const updateService = async (data: {
  id: number;
  values: PostServicesData;
}) => {
  const payload = {
    name: data.values.name,
    price: String(data.values.price),
    description: data.values.description ?? "",
    duration: data.values.duration,
    employee_id: Number(data.values.employee_id),
    ...(data.values.business_id
      ? { business_id: Number(data.values.business_id) }
      : {}),
  };

  // Swagger: PUT /business/services/{id}/
  const response = await api.put(`/business/services/${data.id}/`, payload);
  return response.data;
};
