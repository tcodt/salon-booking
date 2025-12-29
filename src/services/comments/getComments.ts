import { Comment } from "../../types/comments";
import api from "../../utils/api";

export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await api.get("/comments/");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
