import { WorkTimeType } from "../../types/working-time";
import api from "../../utils/api";

export const getWorkingTimeById = async (id: number): Promise<WorkTimeType> => {
  const response = await api.get(`/working_hours/${id}`);
  return response.data;
};
