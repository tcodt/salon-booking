import api from "../../utils/api";

interface AddCommentData {
  target_type: "service" | "business";
  content: string;
  rating: number;
  service?: number;
  business?: number;
}

export const addComment = async (data: AddCommentData) => {
  try {
    const response = await api.post("/comments/", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
