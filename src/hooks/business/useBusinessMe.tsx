import { useQuery } from "@tanstack/react-query";
import { businessMe } from "../../services/business/businessMe";
import { useUserType } from "../../context/UserTypeContext";

export const useBusinessMe = () => {
  const { userType } = useUserType();

  return useQuery({
    queryKey: ["business-me"],
    queryFn: businessMe,
    enabled: userType === "owner",
    retry: false,
  });
};
