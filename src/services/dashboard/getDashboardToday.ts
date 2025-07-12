import { DashboardResponse } from "../../types/dashboard";
import api from "../../utils/api";

export const getDashboardToday = async (): Promise<DashboardResponse> => {
  try {
    const response = await api.get("/dashboard/today-appointments/");
    return response.data;
  } catch (error) {
    console.log("An Error Occured!", error);
    // Return a default value or throw to satisfy the return type
    throw error;
  }
};
