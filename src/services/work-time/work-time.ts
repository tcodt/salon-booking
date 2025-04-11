import { WorkTimePromise } from "../../types/work-time";
import api from "../../utils/api";

export const getWorkTime = async (): Promise<WorkTimePromise> => {
  const response = await api.get("/working_hours/");
  return response.data;
};
