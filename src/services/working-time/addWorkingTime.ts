import { WorkingTimePost, WorkTimePromise } from "../../types/working-time";
import api from "../../utils/api";

export const addWorkingTime = async (
  data: WorkingTimePost
): Promise<WorkTimePromise> => {
  const response = await api.post("/working_hours/", data);
  return response.data;
};
