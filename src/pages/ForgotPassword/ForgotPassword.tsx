import React, { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const phoneNumber = parsedUserData ? parsedUserData.phoneNumber : "";
    setUserPhoneNumber(phoneNumber);
  }, []);

  return (
    <section className="p-4 h-screen">
      <div className="flex items-center justify-between">
        <span className="text-orange-500 font-medium text-2xl">
          بازنشانی رمز عبور
        </span>
        <button
          className="cursor-pointer text-orange-500"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>

      <div className="flex flex-col gap-8 mt-12 pb-4">
        <img
          src="/images/forgot-pass-pic.svg"
          alt="Forgot Password Image"
          className="h-[300px] w-[300px] object-contain mx-auto"
        />
        <p className="text-base text-gray-700 font-medium text-center">
          انتخاب کنید که چطور رمز عبور را بازنشانی کنیم
        </p>
        <div className="flex flex-col gap-4">
          <div className="p-3 rounded-xl border-2 border-slate-200 hover:border-orange-500 transition flex items-center gap-4">
            <div className="p-4 bg-orange-100 text-orange-500 text-2xl rounded-full">
              <AiFillMessage />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 font-medium">
                از طریق SMS
              </span>
              <span className="text-lg text-gray-800 font-medium">
                {userPhoneNumber}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl border-2 border-slate-200 hover:border-orange-500 transition flex items-center gap-4">
            <div className="p-4 bg-orange-100 text-orange-500 text-2xl rounded-full">
              <MdEmail />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 font-medium">
                از طریق ایمیل
              </span>
              <span className="text-lg text-gray-800 font-medium">
                example@example.com
              </span>
            </div>
          </div>
        </div>
        <Button type="button">ادامه</Button>
      </div>
    </section>
  );
};

export default ForgotPassword;
