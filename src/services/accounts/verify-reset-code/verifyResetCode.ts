import api from "../../../utils/api";

export const verifyResetCode = async ({
  phoneNumber,
  code,
}: {
  phoneNumber: string;
  code: string;
}) => {
  try {
    const response = await api.post("/accounts/verify-reset-code/", {
      phone_number: phoneNumber,
      code,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
