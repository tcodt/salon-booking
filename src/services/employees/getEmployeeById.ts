import { NewEmployeePromiseType } from "../../types/employees";
import api from "../../utils/api";

export const getEmployeeById = async (
  id: number
): Promise<NewEmployeePromiseType> => {
  const response = await api.get(`/business/employees/${id}`);
  return response.data;
};
