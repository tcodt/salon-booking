import { useQuery } from "@tanstack/react-query";
import {
  getOwnerServices,
  getCustomerServices,
} from "../../services/services/getServices";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";

export const useGetServices = () => {
  const { isAuthenticated } = useAuth();
  const { userType } = useUserType();
  const { joinedBusiness, hasJoinedBusiness } = useJoinedBusiness();

  const isOwner = userType === "owner";
  const code = joinedBusiness?.random_code ?? "";

  return useQuery({
    queryKey: isOwner ? ["services", "owner"] : ["services", "customer", code],
    queryFn: () => (isOwner ? getOwnerServices() : getCustomerServices(code)),
    enabled:
      isAuthenticated && (isOwner || (Boolean(code) && hasJoinedBusiness)),
    retry: false,
  });
};
