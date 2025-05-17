import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services/profile/updateProfile";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
