import api from "../../../utils/api";

export const resetPassword = async ({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) => {
  try {
    const response = await api.post("/accounts/reset-password/", {
      phone_number: phoneNumber,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
