import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { registerFn } from "../../../services/accounts/register/registerFn";
import { storeAuthTokens } from "../../../utils/tokenHelper";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
      loginContext({ access: data.access, refresh: data.refresh }, data.user);
    },
  });
};
