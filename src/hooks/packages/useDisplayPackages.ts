import { useQuery } from "@tanstack/react-query";
import { displayPackages } from "../../services/packages/displayPackages";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";

export const useDisplayPackages = () => {
  const { joinedBusiness, hasJoinedBusiness, isReady } = useJoinedBusiness();
  const code = joinedBusiness?.random_code ?? "";

  return useQuery({
    queryKey: ["packages-user", code],
    queryFn: () => displayPackages(code),
    enabled: isReady && hasJoinedBusiness && !!code,
    retry: false,
  });
};
