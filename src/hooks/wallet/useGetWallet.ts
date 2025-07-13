import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../../services/wallet/getWallet";

export const useGetWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};
