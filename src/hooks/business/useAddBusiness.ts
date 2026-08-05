import { useMutation } from "@tanstack/react-query";
import { addBusiness } from "../../services/business/addBusiness";

export const useAddBusiness = () => {
  return useMutation({ mutationFn: addBusiness });
};
