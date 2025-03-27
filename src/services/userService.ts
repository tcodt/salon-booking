import api from "../utils/api";

export const fetchUserProfile = async () => {
  const response = await api.get("/dashboard/users/profile/");
  console.log("User Profile: ", response.data);
  return response.data;
};

export const updateUserProfile = async (data: { image?: File }) => {
  const formData = new FormData();
  if (data.image) formData.append("image", data.image);

  const response = await api.patch(
    "/dashboard/users/profile/update/",
    formData,
    {
      headers: { "Content-Type": "multipart/form/-data" },
    }
  );
  return response.data;
};
