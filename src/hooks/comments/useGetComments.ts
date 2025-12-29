import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/comments/getComments";

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60,
  });
};
