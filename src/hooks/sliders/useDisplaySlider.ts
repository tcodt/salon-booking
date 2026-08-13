import { useQuery } from "@tanstack/react-query";
import { displaySlider } from "../../services/sliders/displaySlider";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";

export const useDisplaySlider = () => {
  const { joinedBusiness, hasJoinedBusiness, isReady } = useJoinedBusiness();
  const code = joinedBusiness?.random_code ?? "";

  return useQuery({
    queryKey: ["sliders-user", code],
    queryFn: () => displaySlider(code),
    enabled: isReady && hasJoinedBusiness && !!code,
    retry: false,
  });
};
