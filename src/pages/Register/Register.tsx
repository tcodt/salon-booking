import React, { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegister } from "../../hooks/accounts/register/useRegister";
import Loading from "../../components/Loading/Loading";
import { RegisterType } from "../../types/register";
import { useThemeColor } from "../../context/ThemeColor";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const registerMutation = useRegister();
  const { themeColor } = useThemeColor();

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    const transformedData: RegisterType = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      password: data.password,
    };

    registerMutation.mutate(transformedData);
  };

  return (
    <section className="p-4 w-screen h-screen overflow-y-auto" id="shape">
      <PageBar title="ثبت نام" />

      {registerMutation.isPending && <Loading />}

      <div className="mt-6 flex flex-col gap-4 items-center">
        <div className="md:w-2/4 w-full text-start">
          <h3 className={`text-3xl text-${themeColor}-500 font-semibold`}>
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
                  placeholder={errors?.first_name?.message || "نام"}
                  className={`primary-input ${
                    errors?.first_name?.message
                      ? "text-sm placeholder:text-red-500"
                      : "text-base"
                  }`}
                  {...register("first_name", {
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
                  placeholder={errors?.last_name?.message || "نام خانوادگی"}
                  className={`primary-input ${
                    errors?.last_name?.message
                      ? "text-sm placeholder:text-red-500"
                      : "text-base"
                  }`}
                  {...register("last_name", {
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
                placeholder={errors?.phone_number?.message || "شماره تلفن"}
                autoComplete="username"
                className={`primary-input ps-4 pe-8 ${
                  errors?.phone_number?.message
                    ? "text-sm placeholder:text-red-500"
                    : "text-base"
                }`}
                {...register("phone_number", {
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
            <div className="md:w-2/4 w-full relative">
              <input
                type={isVisible ? "text" : "password"}
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

              {/* lock icon on the left */}
              <div className="absolute top-4 left-2 text-gray-500 text-lg pointer-events-none">
                <IoIosLock />
              </div>

              {/* eye icon button on the right */}
              <button
                type="button"
                className="absolute top-4 right-2 text-gray-500 text-lg z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible((prev) => !prev);
                }}
              >
                {isVisible ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>

            <Button type="submit">ثبت نام</Button>
            <span className="text-lg font-medium text-slate-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-600 font-medium dark:text-gray-300 ">
                حساب کاربری دارید؟{" "}
                <Link to="/login" className={`text-${themeColor}-500`}>
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
