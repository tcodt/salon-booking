import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaPhoneAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { useLogin } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";

interface LoginFormData {
  phone_number: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    const toastId = toast.loading("درحال ورود...");

    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("ورود موفقیت آمیز بود!", { id: toastId });
        navigate("/home");
      },
      onError: (error: AxiosError) => {
        console.error("Login failed: ", error);
        if (error.response?.status === 401) {
          toast.error("شماره تلفن یا رمز عبور اشتباه است!", { id: toastId });
        } else {
          toast.error("خطایی رخ داده است، لطفاً دوباره تلاش کنید", {
            id: toastId,
          });
        }
      },
    });
  };

  return (
    <section className="p-4 w-screen h-screen overflow-y-auto">
      <PageBar title="ورود" />

      {loginMutation.isPending && <Loading />}

      <div className="mt-6 flex flex-col gap-4 items-center">
        <div className="md:w-2/4 w-full text-center">
          <h3 className="text-3xl text-orange-500 font-semibold">خوش آمدید</h3>
          <p className="text-base font-medium text-gray-500 mt-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است
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
                onKeyPress={(e) => {
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
                maxLength={12}
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

            <Button type="submit">ورود</Button>
            <button
              type="button"
              className="text-sm font-medium text-gray-600 cursor-pointer hover:text-orange-500 transition"
              onClick={() => navigate("/forgot-password")}
            >
              رمز عبور خود را فراموش کرده اید؟
            </button>
            <span className="text-lg font-medium text-gray-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-700 font-medium">
                حساب کاربری ندارید؟{" "}
                <Link to="/register" className="text-orange-500">
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
