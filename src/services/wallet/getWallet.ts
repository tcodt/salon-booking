import { WalletResponse } from "../../types/wallet";
import api from "../../utils/api";

export const getWallet = async (): Promise<WalletResponse> => {
  try {
    const response = await api.get("/payments/wallet/");
    return response.data;
  } catch (error) {
    console.log("Error while fetching wallet data: ", error);
    // Return a default WalletResponse object or throw the error
    throw error;
  }
};
