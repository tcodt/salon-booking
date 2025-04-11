import { NewEmployeePromiseType } from "../../types/employees";
import api from "../../utils/api";

export const updateEmployee = async ({
  id,
  user_id,
  skill,
}: {
  id: number;
  user_id: number;
  skill: string;
}): Promise<NewEmployeePromiseType> => {
  const response = await api.put(`/business/employees/update/${id}/`, {
    user_id,
    skill,
  });
  return response.data;
};
