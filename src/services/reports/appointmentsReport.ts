import api from "../../utils/api";

export const appointmentsReport = async () => {
  try {
    const response = await api.get("/reports/appointments/");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
