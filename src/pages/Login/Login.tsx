import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaPhoneAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { useLogin } from "../../hooks/accounts/login/useLogin";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LoginType } from "../../types/login";
import { useThemeColor } from "../../context/ThemeColor";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { themeColor } = useThemeColor();
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();

  const toggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleLogin: SubmitHandler<LoginType> = (data) => {
    const toastId = toast.loading("درحال ورود...");

    loginMutation.mutate(data, {
      onSuccess: async (data) => {
        toast.success("ورود موفقیت آمیز بود!", { id: toastId });
        queryClient.setQueryData(["userProfile"], data.user); // Put user data in cache
        loginContext({ access: data.access, refresh: data.refresh }, data.user);
        navigate("/home");
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.error("Login failed: ", axiosError);
        if (axiosError.response?.status === 401) {
          toast.error("شماره تلفن یا رمز عبور اشتباه است!", { id: toastId });
        } else {
          toast.error("خطای سرور، لطفاً بعداً تلاش کنید", { id: toastId });
        }
      },
    });
  };

  return (
    <section className="p-4 w-screen h-screen overflow-y-auto">
      <PageBar title="ورود" />

      <div className="mt-6 flex flex-col gap-4 items-center">
        <div className="md:w-2/4 w-full text-center">
          <h3 className={`text-3xl text-${themeColor}-500 font-semibold`}>
            خوش آمدید
          </h3>
          <p className="text-sm font-medium text-gray-500 mt-4 dark:text-gray-300">
            با ورود به حساب کاربری خود می‌توانید به‌راحتی زمان دلخواه خود را
            رزرو کنید، خدمات مورد نیازتان را انتخاب کرده و بدون انتظار از خدمات
            حرفه‌ای ما بهره‌مند شوید.
          </p>
        </div>
        <div className="md:w-2/4 w-full flex justify-center p-4">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <label className="md:w-2/4 w-full relative">
              <input
                type="text"
                placeholder="شماره تلفن"
                maxLength={11}
                autoComplete="username"
                className="primary-input"
                {...register("phone_number", {
                  required: "شماره تلفن اجباری است!",
                  pattern: {
                    value: /^09[0-9]{9}$/,
                    message: "شماره تلفن باید 11 رقم باشد!",
                  },
                })}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                // onChange={handleCodeInputChange}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <FaPhoneAlt />
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
                placeholder="رمز عبور"
                minLength={6}
                autoComplete="current-password"
                className="primary-input px-8"
                {...register("password", {
                  required: "رمز عبور اجباری است!",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید بیشتر از 6 کاراکتر باشد!",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <IoIosLock />
              </div>
            </label>

            {/* {phoneNumber.length >= 11 && isCodeInputAvailable && <CodeInput />} */}

            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "در حال ورود..." : "ورود"}
            </Button>
            <button
              type="button"
              className={`text-sm font-medium text-gray-600 dark:text-gray-300 dark:hover:text-${themeColor}-500 cursor-pointer hover:text-${themeColor}-500 transition`}
              onClick={() => navigate("/forgot-password")}
            >
              رمز عبور خود را فراموش کرده اید؟
            </button>
            <span className="text-lg font-medium text-gray-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-700 font-medium dark:text-gray-300 ">
                حساب کاربری ندارید؟{" "}
                <Link to="/register" className={`text-${themeColor}-500`}>
                  ثبت نام
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
