import { useQueryClient } from "@tanstack/react-query";
import { clearAuthTokens } from "../../../utils/tokenHelper";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    clearAuthTokens();
    queryClient.removeQueries({ queryKey: ["userProfile"] });
  };
};
