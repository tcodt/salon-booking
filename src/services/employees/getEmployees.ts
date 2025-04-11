import { GetEmployees } from "../../types/employees";
import api from "../../utils/api";

export const getEmployees = async (): Promise<GetEmployees> => {
  const response = await api.get("/business/employees/");
  return response.data;
};
