import React, { FormEvent, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  // TEST: Generate random token

  const generateToken = () => {
    return uuidv4();
  };

  // const rand = () => {
  //   return Math.random().toString(36).substr(2);
  // };

  // const token = () => {
  //   return rand() + rand();
  // };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!username) {
      toast("لطفا نام و نام خانوادگی را وارد کنید!", {
        type: "error",
        position: "bottom-right",
        autoClose: 4000,
        transition: Bounce,
      });
      return;
    }

    if (!email) {
      toast("لطفا ایمیل را وارد کنید!", {
        type: "error",
        position: "bottom-right",
        autoClose: 4000,
        transition: Bounce,
      });
      return;
    }

    if (phoneNumber.length !== 11) {
      toast("شماره تلفن باید ۱۱ رقم باشد!", {
        type: "error",
        position: "bottom-right",
        autoClose: 4000,
        transition: Bounce,
      });
      return;
    }

    if (password.length < 4) {
      toast("رمز عبور باید حداقل ۴ کاراکتر باشد!", {
        type: "error",
        position: "bottom-right",
        autoClose: 4000,
        transition: Bounce,
      });
      return;
    }

    const userData = {
      username,
      email,
      phoneNumber,
      password,
      token: generateToken(),
    };

    // Store the token in localStorage
    localStorage.setItem("authToken", userData.token);

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/login");
  };

  return (
    <section className="p-4 h-screen" id="shape">
      <div className="flex items-center justify-between">
        <span className="text-orange-500 font-medium text-2xl">ثبت نام</span>
        <button
          className="cursor-pointer text-orange-500"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>
      <div className="mt-12 flex flex-col gap-12 items-center">
        <div className="md:w-2/4 w-full flex justify-center p-4 rounded-xl bg-transparent shadow-xl shadow-black backdrop-blur-xl border border-slate-700">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-zinc-200">
                نام و نام خانوادگی
              </span>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="outline-none bg-gray-800 py-2 px-4 rounded-xl text-zinc-300 font-medium text-base border-2 border-orange-500 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-zinc-200">
                ایمیل
              </span>
              <input
                type="email"
                placeholder="example@example.com"
                className="outline-none bg-gray-800 py-2 px-4 rounded-xl text-left text-zinc-300 font-medium text-base border-2 border-orange-500 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-zinc-200">
                شماره تلفن
              </span>
              <input
                type="text"
                placeholder="09123456789"
                className="outline-none bg-gray-800 py-2 px-4 rounded-xl text-left text-zinc-300 font-medium text-base border-2 border-orange-500 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-zinc-200">
                رمز عبور
              </span>
              <input
                type="password"
                placeholder="..............."
                className="outline-none bg-gray-800 py-2 px-4 rounded-xl text-left text-zinc-300 font-medium text-base border-2 border-orange-500 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="md:w-2/4 w-full h-11 hover:bg-orange-700 bg-orange-600 text-white transition text-base font-medium rounded-xl py-2 px-4 cursor-pointer"
            >
              ثبت نام
            </button>
            <span className="text-lg font-medium text-zinc-200 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-zinc-200 font-medium">
                حساب کاربری دارید؟{" "}
                <Link to="/login" className="text-gray-800">
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
