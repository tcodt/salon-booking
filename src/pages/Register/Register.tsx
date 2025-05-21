import React, { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";
import { MdEmail } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";
import { RegisterType } from "../../types/register";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

type FormData = {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const handleRegister: SubmitHandler<FormData> = async (data) => {
    const transformedData: RegisterType = {
      first_name: data.name,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(transformedData, {
      onSuccess: (data) => {
        queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
        loginContext({ access: data.access, refresh: data.refresh }, data.user);
        navigate("/home"); // Redirect to /login when have SMS panel
      },
    });

    if (errors.phoneNumber) {
      toast.error("شماره تلفن صحیح نیست!");
    }
  };

  return (
    <section className="p-4 w-screen h-screen overflow-y-auto" id="shape">
      <PageBar title="ثبت نام" />

      {registerMutation.isPending && <Loading />}

      <div className="mt-6 flex flex-col gap-4 items-center">
        <div className="md:w-2/4 w-full text-start">
          <h3 className="text-3xl text-orange-500 font-semibold">
            ایجاد حساب کاربری
          </h3>
        </div>

        <div className="md:w-2/4 w-full flex justify-center p-4">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <div className="flex items-center gap-2">
              <label className="md:w-2/4 w-full relative">
                <input
                  type="text"
                  placeholder={errors?.name?.message || "نام"}
                  className={`primary-input ${
                    errors?.name?.message
                      ? "text-sm placeholder:text-red-500"
                      : "text-base"
                  }`}
                  {...register("name", {
                    required: "الزامی",
                    minLength: {
                      value: 2,
                      message: "نام باید بیشتر از 2 کاراکتر باشد!",
                    },
                  })}
                />

                <div className="absolute top-4 left-2 text-gray-500 text-lg">
                  <FaUser />
                </div>
              </label>
              <label className="md:w-2/4 w-full relative">
                <input
                  type="text"
                  placeholder={errors?.lastName?.message || "نام خانوادگی"}
                  className={`primary-input ${
                    errors?.lastName?.message
                      ? "text-sm placeholder:text-red-500"
                      : "text-base"
                  }`}
                  {...register("lastName", {
                    required: "الزامی",
                    minLength: {
                      value: 2,
                      message: "نام خانوادگی باید بیشتر از 2 کاراکتر باشد!",
                    },
                  })}
                />
                <div className="absolute top-4 left-2 text-gray-500 text-lg">
                  <FaUser />
                </div>
              </label>
            </div>
            <label className="md:w-2/4 w-full relative">
              <input
                type="text"
                maxLength={11}
                placeholder={errors?.phoneNumber?.message || "شماره تلفن"}
                autoComplete="username"
                className={`primary-input ps-4 pe-8 ${
                  errors?.phoneNumber?.message
                    ? "text-sm placeholder:text-red-500"
                    : "text-base"
                }`}
                {...register("phoneNumber", {
                  required: "شماره تلفن اجباری است!",
                  pattern: {
                    value: /^09[0-9]{9}$/,
                    message: "شماره تلفن باید 11 رقم باشد!",
                  },
                })}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <FaPhoneAlt />
              </div>
            </label>
            <label className="md:w-2/4 w-full relative">
              <input
                type="email"
                placeholder={errors?.email?.message || "ایمیل"}
                className={`primary-input px-8 text-left ${
                  errors?.email?.message
                    ? "text-sm placeholder:text-red-500"
                    : "text-base"
                }`}
                {...register("email", {
                  required: "ایمیل اجباری است!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "ایمیل نا معتبر است!",
                  },
                })}
              />
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <MdEmail />
              </div>
            </label>
            <label className="md:w-2/4 w-full relative">
              <span
                className="absolute top-4 right-2 text-gray-500 text-lg"
                onClick={toggle}
              >
                {isVisible ? <IoEye /> : <IoEyeOff />}
              </span>
              <input
                type={!isVisible ? "password" : "text"}
                placeholder={errors?.password?.message || "رمز عبور"}
                maxLength={12}
                autoComplete="current-password"
                className={`primary-input px-8 text-left ${
                  errors?.password?.message
                    ? "text-sm placeholder:text-red-500"
                    : "text-base"
                }`}
                {...register("password", {
                  required: "رمز عبور اجباری است!",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید بیشتر از 6 کاراکتر باشد!",
                  },
                })}
              />
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <IoIosLock />
              </div>
            </label>

            <Button type="submit">ثبت نام</Button>
            <span className="text-lg font-medium text-slate-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-600 font-medium">
                حساب کاربری دارید؟{" "}
                <Link to="/login" className="text-orange-500">
                  ورود
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
