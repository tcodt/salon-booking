import api from "../../utils/api";

export const addUser = async (newUser: FormData) => {
  const response = await api.post("/dashboard/users/", newUser, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
