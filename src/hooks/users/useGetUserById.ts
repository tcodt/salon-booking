import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/users/getUserById";

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
