import { NewEmployee } from "../../pages/AddEmployee/AddEmployee";
import api from "../../utils/api";

export const getEmployeeById = async (id: number): Promise<NewEmployee> => {
  const response = await api.get(`/business/employees/${id}`);
  return response.data;
};
