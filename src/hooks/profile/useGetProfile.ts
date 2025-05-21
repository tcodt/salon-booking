import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/profile/getProfile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfile,
    enabled: !!localStorage.getItem("accessToken"),
  });
};
