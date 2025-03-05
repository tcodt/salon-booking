import React, { FormEvent, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);

        if (email === userData.email && password === userData.password) {
          login(userData.token);
          localStorage.setItem("authToken", userData.token); // Store token in localStorage
          navigate("/");
        } else {
          toast("ایمیل یا رمز عبور اشتباه است!", {
            type: "error",
            position: "bottom-right",
            autoClose: 4000,
            transition: Bounce,
          });
        }
      } catch (err) {
        console.error("Error parsing userData:", err);
        toast("داده های کاربر معتبر نیستند!", {
          type: "error",
          position: "bottom-right",
          autoClose: 4000,
          transition: Bounce,
        });
      }
    } else {
      toast("هیچ کاربری با این مشخصات پیدا نشد!", {
        type: "error",
        position: "bottom-right",
        autoClose: 4000,
        transition: Bounce,
      });
    }
  };

  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium text-2xl">ورود</span>
        <button
          className="cursor-pointer text-slate-600"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>
      <div className="mt-12 flex flex-col gap-12 items-center">
        <div className="w-2/4 text-center">
          <h3 className="text-3xl text-gray-800 font-semibold">خوش آمدید</h3>
          <p className="text-base font-medium text-gray-600 mt-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است
          </p>
        </div>
        <div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <label>
              <span className="block mb-2 text-base font-medium text-gray-700">
                ایمیل
              </span>
              <input
                type="email"
                placeholder="example@example.com"
                className="outline-none bg-slate-100 py-2 px-4 rounded-xl text-left text-gray-800 font-medium text-base border border-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span className="block mb-2 text-base font-medium text-gray-700">
                رمز عبور
              </span>
              <input
                type="password"
                placeholder="..............."
                className="outline-none bg-slate-100 py-2 px-4 rounded-xl text-left text-gray-800 font-medium text-base border border-slate-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                className="block mt-2 text-sm font-medium text-gray-500"
              >
                رمز عبور خود را فراموش کرده اید؟
              </a>
            </label>

            <button
              type="submit"
              className="w-full border border-slate-500 hover:bg-white hover:text-slate-600 bg-slate-800 text-white transition text-base font-medium rounded-xl py-2 px-4 cursor-pointer"
            >
              ورود
            </button>
            <span className="text-lg font-medium text-gray-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-600 font-medium">
                حساب کاربری ندارید؟{" "}
                <Link to="/register" className="text-gray-800">
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
