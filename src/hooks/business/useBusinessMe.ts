import { useQuery } from "@tanstack/react-query";
import { businessMe } from "../../services/business/businessMe";
import { useAuth } from "../../context/AuthContext";

export const useBusinessMe = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["business-me"],
    queryFn: businessMe,
    enabled: isAuthenticated,
    retry: false,
    // 404 for pure customers is expected
  });
};
