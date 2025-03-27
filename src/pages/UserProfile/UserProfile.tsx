import React from "react";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../services/userService";
import toast from "react-hot-toast";

const UserProfile: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: user, isPending } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isPending) toast.loading("درحال بارگذاری...");

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  const handleImageUpload = (file: File) => {
    mutation.mutate({ image: file });
  };

  return (
    <section>
      <div>
        <ImageUploader
          onUpload={handleImageUpload}
          currentImage={user?.image}
        />
      </div>

      {/* <form className="flex flex-col gap-4">
        <label className="md:w-2/4 w-full">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base h-12 w-full"
          />
        </label>
        <label className="md:w-2/4 w-full">
          <input
            type="email"
            placeholder="ایمیل"
            className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base h-12 w-full text-left"
          />
        </label>
      </form> */}
    </section>
  );
};

export default UserProfile;
