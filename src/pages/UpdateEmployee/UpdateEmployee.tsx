import { Checkbox } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { useEmployeeById, useUpdateEmployee } from "../../hooks/useBooking";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { AxiosError } from "axios";
// import { AxiosError } from "axios";

interface NewUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  is_owner: boolean;
  is_active: boolean;
  is_staff: boolean;
  image?: string;
}

export interface NewEmployee {
  id?: number;
  user: NewUser;
  skill: string;
}

const UpdateEmployee: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewEmployee>();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  console.log(employeeId);
  const { data: employeeData, isPending } = useEmployeeById(employeeId);
  const updateEmployeeMutation = useUpdateEmployee(employeeId);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (employeeData) {
      reset(employeeData);
    }
  }, [employeeData, reset]);

  //   useEffect(() => {
  //     if (employeeData) {
  //       reset({
  //         user: {
  //           first_name: employeeData.user.first_name,
  //           last_name: employeeData.user.last_name,
  //           phone_number: employeeData.user.phone_number,
  //           email: employeeData.user.email,
  //           is_owner: employeeData.user.is_owner,
  //           is_active: employeeData.user.is_active,
  //           is_staff: employeeData.user.is_staff,
  //           image: employeeData.user.image,
  //         },
  //         skill: employeeData.skill,
  //       });
  //     }
  //   }, [employeeData, reset]);

  const updateEmployeeHandler = (data: NewEmployee) => {
    const updateEmployeeToastId = toast.loading("درحال بارگذاری...");
    updateEmployeeMutation.mutate(data, {
      onSuccess: (data) => {
        console.log("Updated employee: ", data);
        toast.success("کارمند با موفقیت بروزرسانی شد", {
          id: updateEmployeeToastId,
        });
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        reset();
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        toast.error("خطا در بروزرسانی!", { id: updateEmployeeToastId });
      },
    });
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <form
        onSubmit={handleSubmit(updateEmployeeHandler)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageUploader
            onUpload={(imageUrl) =>
              console.log("Uploaded image URL:", imageUrl)
            }
          />
          <div className="flex items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                نام
              </label>
              <input
                {...register("user.first_name", {
                  required: "این فیلد الزامی است",
                })}
                type="text"
                className="mt-1 block w-full rounded-xl border-2 focus:border-orange-500 h-12 px-4 outline-none"
              />
              {errors?.user?.first_name && (
                <span className="text-red-500 text-sm">
                  {errors?.user?.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                نام خانوادگی
              </label>
              <input
                {...register("user.last_name", {
                  required: "این فیلد الزامی است",
                })}
                type="text"
                className="mt-1 block w-full rounded-xl border-2 focus:border-orange-500 h-12 px-4 outline-none"
              />
              {errors?.user?.last_name && (
                <span className="text-red-500 text-sm">
                  {errors?.user?.last_name.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              شماره تلفن
            </label>
            <input
              {...register("user.phone_number", {
                required: "این فیلد الزامی است",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "شماره تلفن باید فقط شامل اعداد و 11 رقم باشد",
                },
              })}
              type="text"
              maxLength={11}
              inputMode="numeric"
              className="mt-1 block w-full rounded-xl border-2 focus:border-orange-500 h-12 px-4 outline-none"
            />
            {errors?.user?.phone_number && (
              <span className="text-red-500 text-sm">
                {errors?.user?.phone_number.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ایمیل
            </label>
            <input
              {...register("user.email", {
                required: "این فیلد الزامی است",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "ایمیل معتبر نیست",
                },
              })}
              type="email"
              className="mt-1 block w-full rounded-xl border-2 focus:border-orange-500 h-12 px-4 outline-none"
            />
            {errors?.user?.email && (
              <span className="text-red-500 text-sm">
                {errors?.user?.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              مهارت
            </label>
            <input
              {...register("skill", { required: "این فیلد الزامی است" })}
              type="text"
              className="mt-1 block w-full rounded-xl border-2 focus:border-orange-500 h-12 px-4 outline-none"
            />
            {errors?.skill && (
              <span className="text-red-500 text-sm">
                {errors?.skill.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-evenly">
            <div className="flex items-center">
              <Checkbox
                {...register("user.is_owner")}
                sx={{
                  color: orange[800],
                  "&.Mui-checked": {
                    color: orange[600],
                  },
                }}
              />
              <label className="ml-2 block text-sm text-gray-700">مالک</label>
            </div>
            <div className="flex items-center">
              <Checkbox
                {...register("user.is_active")}
                sx={{
                  color: orange[800],
                  "&.Mui-checked": {
                    color: orange[600],
                  },
                }}
              />
              <label className="ml-2 block text-sm text-gray-700">فعال</label>
            </div>
            <div className="flex items-center">
              <Checkbox
                {...register("user.is_staff")}
                sx={{
                  color: orange[800],
                  "&.Mui-checked": {
                    color: orange[600],
                  },
                }}
              />
              <label className="ml-2 block text-sm text-gray-700">کارمند</label>
            </div>
          </div>
        </div>
        <Button type="submit">ارسال</Button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
