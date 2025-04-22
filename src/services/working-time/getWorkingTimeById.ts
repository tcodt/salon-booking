import { WorkTimePromise } from "../../types/working-time";
import api from "../../utils/api";

export const getWorkingTimeById = async (
  id: number
): Promise<WorkTimePromise> => {
  const response = await api.get(`/working_hours/${id}`);
  return response.data;
};
