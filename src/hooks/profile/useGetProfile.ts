import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profile/getProfile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!localStorage.getItem("accessToken"),
  });
};
