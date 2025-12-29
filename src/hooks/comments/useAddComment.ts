import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addComment } from "../../services/comments/addComment";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد!");
      queryClient.refetchQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      toast.error("خطایی در ارسال نظر رخ داد.");
    },
  });
};
