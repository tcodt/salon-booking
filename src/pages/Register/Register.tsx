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
    <section className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium text-2xl">ثبت نام</span>
        <button
          className="cursor-pointer text-gray-600"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>
      <div className="mt-12 flex flex-col gap-12 items-center">
        <div>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <label>
              <span className="block mb-2 text-base font-medium text-gray-700">
                نام و نام خانوادگی
              </span>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="outline-none bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base border border-slate-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
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
                شماره تلفن
              </span>
              <input
                type="text"
                placeholder="09123456789"
                className="outline-none bg-slate-100 py-2 px-4 rounded-xl text-left text-gray-800 font-medium text-base border border-slate-200"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            </label>

            <button
              type="submit"
              className="w-full border border-slate-500 hover:bg-white hover:text-slate-600 bg-slate-800 text-white transition text-base font-medium rounded-xl py-2 px-4 cursor-pointer"
            >
              ثبت نام
            </button>
            <span className="text-lg font-medium text-gray-700 text-center">
              ...
            </span>
            <div>
              <span className="text-base text-gray-600 font-medium">
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
