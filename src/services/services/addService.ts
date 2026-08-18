import { PostServicesData } from "../../types/services";
import api from "../../utils/api";

export const addService = async (serviceData: PostServicesData) => {
  // Swagger: POST /business/services/create/  (NOT /business/services/)
  const payload = {
    name: serviceData.name,
    price: String(serviceData.price),
    description: serviceData.description ?? "",
    duration: serviceData.duration,
    employee_id: Number(serviceData.employee_id),
    // business is readOnly on Service schema; backend usually scopes by owner token
    ...(serviceData.business_id
      ? { business_id: Number(serviceData.business_id) }
      : {}),
  };

  const response = await api.post("/business/services/create/", payload);
  return response.data;
};
