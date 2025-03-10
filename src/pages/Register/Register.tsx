import React, { FormEvent, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button/Button";

const Register: React.FC = () => {
  // const [username, setUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  // TEST: Generate random token

  const generateToken = () => {
    return uuidv4();
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    // if (!username) {
    //   toast("لطفا نام و نام خانوادگی را وارد کنید!", {
    //     type: "error",
    //     position: "bottom-right",
    //     autoClose: 4000,
    //     transition: Bounce,
    //   });
    //   return;
    // }

    // if (!email) {
    //   toast("لطفا ایمیل را وارد کنید!", {
    //     type: "error",
    //     position: "bottom-right",
    //     autoClose: 4000,
    //     transition: Bounce,
    //   });
    //   return;
    // }

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
      // username,
      // email,
      phoneNumber,
      password,
      token: generateToken(),
    };

    // Store the token in localStorage
    localStorage.setItem("authToken", userData.token);

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/user-profile");
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
        <div className="md:w-2/4 w-full text-start">
          <h3 className="text-3xl text-orange-500 font-semibold">
            ایجاد حساب کاربری
          </h3>
        </div>
        <div className="md:w-2/4 w-full flex justify-center p-4">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            {/* <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-gray-700">
                نام و نام خانوادگی
              </span>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base h-12 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label> */}
            {/* <label className="md:w-2/4 w-full">
              <span className="block mb-2 text-base font-medium text-gray-700">
                ایمیل
              </span>
              <input
                type="email"
                placeholder="example@example.com"
                className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-left text-gray-800 font-medium text-base h-12 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label> */}
            <label className="md:w-2/4 w-full relative">
              {/* <span className="block mb-2 text-base font-medium text-gray-700">
                شماره تلفن
              </span> */}
              <input
                type="text"
                placeholder="شماره تلفن"
                className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 ps-4 pe-8 rounded-xl text-left text-gray-800 font-medium text-base h-12 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="absolute top-4 left-2 text-gray-500 text-lg">
                <FaPhoneAlt />
              </div>
            </label>
            <label className="md:w-2/4 w-full relative">
              {/* <span className="block mb-2 text-base font-medium text-gray-700">
                رمز عبور
              </span> */}
              <span
                className="absolute top-4 right-2 text-gray-500 text-lg"
                onClick={toggle}
              >
                <IoEye />
              </span>
              <input
                type={!isVisible ? "password" : "text"}
                placeholder="رمز عبور"
                maxLength={12}
                className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-8 rounded-xl text-left text-gray-800 font-medium text-base h-12 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
