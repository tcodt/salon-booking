import { useQuery } from "@tanstack/react-query";
import { displayPackages } from "../../services/packages/displayPackages";

export const useDisplayPackages = () => {
  return useQuery({
    queryKey: ["packages-user"],
    queryFn: displayPackages,
  });
};
