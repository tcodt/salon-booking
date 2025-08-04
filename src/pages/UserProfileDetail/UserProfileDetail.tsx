import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import Dots from "../../components/Dots/Dots";
import { FaPen, FaTrash, FaUser } from "react-icons/fa";
import { useThemeColor } from "../../context/ThemeColor";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useRemoveUser } from "../../hooks/users/useRemoveUser";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const UserProfileDetail: React.FC = () => {
  const { data: userData, error, isError, isPending } = useGetUsers();
  const { id } = useParams();
  const { themeColor } = useThemeColor();

  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  //   const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  const removeUserMutation = useRemoveUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const matchUser = userData?.filter((user) => user?.id === Number(id));

  const handleRemoveUser = (id: number) => {
    console.log("delete user id: ", id);
    removeUserMutation.mutate(id, {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        navigate("/dashboard");
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.log("An error occured while removing user: ", axiosError);
      },
    });
  };

  if (isPending) return <Dots />;

  if (isError) {
    console.log(`An error occured: ${error}`);
  }

  return (
    <>
      <div className="flex items-center justify-center mt-12">
        {matchUser?.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm min-w-72"
          >
            {isRemoveOpen && (
              <CustomModal
                isOpen={isRemoveOpen}
                onClose={() => setIsRemoveOpen(false)}
                title="حذف کاربر"
              >
                <p className="text-gray-800 dark:text-gray-200 text-center text-base font-medium">
                  از حذف کاربر اطمینان دارید؟
                </p>

                <div className="flex flex-row items-center gap-4 mt-8">
                  <button
                    type="button"
                    className="py-2 px-4 rounded-full bg-green-500 text-white hover:opacity-50 transition-opacity flex-1"
                    onClick={() => handleRemoveUser(user?.id)}
                  >
                    بله
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 rounded-full bg-red-500 text-white hover:opacity-50 transition-opacity flex-1"
                    onClick={() => setIsRemoveOpen(false)}
                  >
                    خیر
                  </button>
                </div>
              </CustomModal>
            )}
            <div
              className={`w-32 h-32 flex items-center justify-center rounded-full mx-auto border-4 border-${themeColor}-500`}
              id="rotation_profile"
            >
              {user?.image ? (
                <img
                  src={user?.image}
                  alt="User Image"
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <FaUser className="text-4xl text-gray-400" />
              )}
            </div>
            <div className="mt-8 text-center flex flex-col gap-4">
              <h3 className="text-gray-800 dark:text-white text-lg font-semibold">
                {user.first_name} {user.last_name}
              </h3>
              <span className="text-base text-gray-500 dark:text-gray-300 font-medium">
                {user.phone_number}
              </span>
              <span className={`text-base text-${themeColor}-500 font-medium`}>
                {user.is_owner ? "مدیر" : "کاربر"}
              </span>
              <div className="flex flex-row items-center justify-between">
                <button
                  type="button"
                  className="p-3 rounded-full bg-green-500 text-white hover:opacity-50 transition-opacity"
                >
                  <FaPen />
                </button>
                <button
                  type="button"
                  className="p-3 rounded-full bg-red-500 text-white hover:opacity-50 transition-opacity"
                  onClick={() => setIsRemoveOpen(true)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserProfileDetail;
