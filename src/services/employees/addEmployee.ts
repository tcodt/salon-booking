import { NewEmployeePromiseType } from "../../types/types";
import api from "../../utils/api";

export const addEmployee = async (newEmployee: {
  user_id: number;
  skill: string;
}): Promise<NewEmployeePromiseType> => {
  const response = await api.post("/business/employees/create/", newEmployee);
  return response.data;
};
