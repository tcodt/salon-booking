import api from "../../../utils/api";

export const sendResetCode = async (phoneNumber: string) => {
  try {
    const response = await api.post("/accounts/send-reset-code/", {
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
