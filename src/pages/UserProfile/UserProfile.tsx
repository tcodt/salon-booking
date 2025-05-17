import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { FaPencil } from "react-icons/fa6";
import CustomModal from "../../components/CustomModal/CustomModal";
import { IoCamera } from "react-icons/io5";
import toast from "react-hot-toast";
import { Checkbox } from "@mui/material";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { UpdateProfile } from "../../types/profile";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProfile } from "../../hooks/profile/useUpdateProfile";
import { AxiosError } from "axios";

const UserProfile: React.FC = () => {
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: userProfile } = useGetProfile();
  const updateProfileMutation = useUpdateProfile();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfile>({
    defaultValues: {
      first_name: userProfile?.first_name || "",
      last_name: userProfile?.last_name || "",
      phone_number: "",
      is_owner: userProfile?.is_owner || false,
      is_superuser: false,
      is_staff: !userProfile?.is_owner || false,
    },
  });

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error("حجم فایل بیش از حد مجاز است");
        return;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("فرمت فایل مجاز نیست");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Update form values when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setValue("first_name", userProfile.first_name || "");
      setValue("last_name", userProfile.last_name || "");
      setValue("phone_number", userProfile.phone_number || "");
      setValue("is_owner", userProfile.is_owner || false);
      setValue("is_superuser", userProfile.is_superuser || false);
      setValue("is_staff", !userProfile.is_owner || false);
    }
  }, [userProfile, setValue]);

  const onSubmit = (data: UpdateProfile) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone_number", data.phone_number);
    formData.append("is_owner", String(data.is_owner));
    formData.append("is_superuser", String(data.is_superuser));
    formData.append("is_staff", String(data.is_staff));
    if (image) {
      formData.append("image", image);
    }

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success("پروفایل با موفقیت بروزرسانی شد");
        setIsUpdateOpen(false);
        reset();
        setImage(null);
        setPreview(null);
      },
      onError: (error) => {
        toast.error("خطا در بروزرسانی پروفایل");
        const axiosError = error as AxiosError;
        console.error(axiosError);
      },
    });
  };

  return (
    <section>
      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 border-2 border-orange-700">
        <div className="flex items-start justify-between">
          <ul className="space-y-4 list-disc marker:text-orange-700 ms-4">
            <li className="text-white font-medium">
              نام: <span>{userProfile?.first_name}</span>
            </li>
            <li className="text-white font-medium">
              خانوادگی: <span>{userProfile?.last_name}</span>
            </li>
            <li className="text-white font-medium">
              نقش: <span>{userProfile?.is_owner ? "ادمین" : "کاربر"}</span>
            </li>
          </ul>
          <div className="border-2 border-white rounded-full bg-orange-50">
            {userProfile?.image ? (
              <img
                src={userProfile.image}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-500 text-4xl" />
            )}
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          reset();
          setImage(null);
          setPreview(null);
        }}
        title="بروزرسانی"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="نام"
                className={`primary-input ${
                  errors.first_name ? "border-red-500" : ""
                }`}
                {...register("first_name", {
                  required: "نام الزامی است",
                  minLength: {
                    value: 2,
                    message: "نام باید حداقل ۲ کاراکتر باشد",
                  },
                })}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="نام خانوادگی"
                className={`primary-input ${
                  errors.last_name ? "border-red-500" : ""
                }`}
                {...register("last_name", {
                  required: "نام خانوادگی الزامی است",
                  minLength: {
                    value: 2,
                    message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد",
                  },
                })}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="شماره همراه"
              className={`primary-input ${
                errors.phone_number ? "border-red-500" : ""
              }`}
              {...register("phone_number", {
                required: "شماره همراه الزامی است",
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: "شماره همراه معتبر وارد کنید",
                },
              })}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="package-image">
              <div className="bg-gray-200 text-gray-800 hover:bg-gray-300 border-2 border-gray-300 rounded-xl py-2 px-4 flex items-center gap-2 cursor-pointer">
                انتخاب عکس <IoCamera size={20} />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="package-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 rounded-md"
              />
            )}
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row items-center">
              <Checkbox
                {...register("is_owner")}
                defaultChecked={userProfile?.is_owner}
                color="default"
                id="owner"
              />
              <label htmlFor="owner">مالک</label>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                {...register("is_superuser")}
                defaultChecked={false}
                color="default"
                id="super_user"
              />
              <label htmlFor="super_user">کارمند</label>
            </div>
            <div className="flex flex-row items-center">
              <Checkbox
                {...register("is_staff")}
                defaultChecked={!userProfile?.is_owner}
                color="default"
                id="user"
              />
              <label htmlFor="user">کاربر</label>
            </div>
          </div>
          <Button variant="update" type="submit">
            بروزرسانی
          </Button>
        </form>
      </CustomModal>

      <div className="mt-8">
        <button
          type="button"
          className="text-orange-500 hover:text-orange-600 transition font-medium text-base flex items-center gap-2"
          onClick={() => setIsUpdateOpen(true)}
        >
          <FaPencil className="text-xl" /> ویرایش
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
