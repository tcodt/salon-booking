import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { registerUser } from "../../../services/authService";
// import { storeAuthTokens } from "../../../utils/tokenHelper";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      //   storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
      login({ access: data.access, refresh: data.refresh }, data.user);
    },
  });
};
