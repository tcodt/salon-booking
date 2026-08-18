import { useQuery } from "@tanstack/react-query";
import { getSlots } from "../../services/slots/getSlots";
import { useAuth } from "../../context/AuthContext";
import { useUserType } from "../../context/UserTypeContext";

export const useGetSlots = () => {
  const { isAuthenticated } = useAuth();
  const { userType } = useUserType();

  return useQuery({
    queryKey: ["slots", "owner"],
    queryFn: getSlots,
    enabled: isAuthenticated && userType === "owner",
    retry: false,
  });
};
