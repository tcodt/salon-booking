import { WorkTimePromise } from "../../types/working-time";
import api from "../../utils/api";

export const displayWorkingTime = async (): Promise<WorkTimePromise> => {
  const response = await api.get("/working_hours/user/");
  return response.data;
};
