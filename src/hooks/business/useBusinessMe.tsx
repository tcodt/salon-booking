import { useQuery } from "@tanstack/react-query";
import { businessMe } from "../../services/business/businessMe";

export const useBusinessMe = () => {
  return useQuery({
    queryKey: ["business-me"],
    queryFn: businessMe,
  });
};
