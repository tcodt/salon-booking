import { WorkingTimePost, WorkTimeType } from "../../types/working-time";
import api from "../../utils/api";

export const updateWorkingTime = async (data: {
  id: number;
  data: WorkingTimePost;
}): Promise<WorkTimeType> => {
  const response = await api.put(`/working_hours/${data.id}/`, data.data);
  return response.data;
};
