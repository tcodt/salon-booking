import React, { ChangeEvent, FormEvent, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import CodeInput from "../../components/CodeInput/CodeInput";
import { FaPhoneAlt } from "react-icons/fa";
import Button from "../../components/Button/Button";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isCodeInputAvailable, setIsCodeInputAvailable] =
    useState<boolean>(false);
  const { login } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();

  const navigate = useNavigate();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const handleCodeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsCodeInputAvailable(true);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);

        if (phoneNumber === userData.phoneNumber) {
          login(userData.token);
          localStorage.setItem("authToken", userData.token); // Store token in localStorage
          navigate("/");
        } else {
          toast("شماره تلفن اشتباه است!", {
            type: "error",
            position: "top-right",
            autoClose: 4000,
            transition: Bounce,
          });
        }
      } catch (err) {
        console.error("Error parsing userData:", err);
        toast("داده های کاربر معتبر نیستند!", {
          type: "error",
          position: "top-right",
          autoClose: 4000,
          transition: Bounce,
        });
      }
    } else {
      toast("هیچ کاربری با این مشخصات پیدا نشد!", {
        type: "error",
        position: "top-right",
        autoClose: 4000,
        transition: Bounce,
      });
    }
  };

  return (
    <section className="p-4 h-screen">
      <div className="flex items-center justify-between">
        <span className="text-orange-500 font-medium text-2xl">ورود</span>
        <button
          className="cursor-pointer text-orange-500"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <div className="mt-12 flex flex-col gap-12 items-center">
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
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <label className="md:w-2/4 w-full relative">
              <input
                type="text"
                placeholder="شماره تلفن"
                maxLength={11}
                className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 ps-4 pe-8 rounded-xl text-left text-gray-800 font-medium text-base h-12 w-full"
                value={phoneNumber}
                onChange={handleCodeInputChange}
              />
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <FaPhoneAlt />
              </div>
            </label>

            {phoneNumber.length >= 11 && isCodeInputAvailable && <CodeInput />}

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
