import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";
import { businessMe } from "../../services/business/businessMe";

export const useBusinessMe = () => {
  const { isAuthenticated } = useAuth();
  const { userType } = useUserType();

  return useQuery({
    queryKey: ["business-me"],
    queryFn: businessMe,
    // Only owners need this endpoint
    enabled: isAuthenticated && userType === "owner",
    retry: false,
  });
};
