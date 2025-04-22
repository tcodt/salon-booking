import { WorkTimePromise } from "../../types/working-time";
import api from "../../utils/api";

export const getWorkingTime = async (): Promise<WorkTimePromise> => {
  const response = await api.get("/working_hours/");
  return response.data;
};
