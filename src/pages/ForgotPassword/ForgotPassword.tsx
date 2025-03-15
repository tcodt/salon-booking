import React, { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<"phoneNumber" | "email">(
    "phoneNumber"
  );

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const phoneNumber = parsedUserData ? parsedUserData.phoneNumber : "";
    setUserPhoneNumber(phoneNumber);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/receive-code");
  };

  return (
    <section className="p-4 h-screen">
      <PageBar title="بازنشانی رمز عبور" handleClick={getBackToPreviousPage} />

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
          <div
            className={`p-3 rounded-xl border-2 hover:border-orange-500 transition flex items-center gap-4 ${
              selectedBox === "phoneNumber"
                ? "border-orange-500"
                : "border-slate-200"
            }`}
            onClick={() => setSelectedBox("phoneNumber")}
          >
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
          <div
            className={`p-3 rounded-xl border-2 hover:border-orange-500 transition flex items-center gap-4 ${
              selectedBox === "email" ? "border-orange-500" : "border-slate-200"
            }`}
            onClick={() => setSelectedBox("email")}
          >
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
        <Button type="submit" onClick={handleSubmit}>
          ادامه
        </Button>
      </div>
    </section>
  );
};

export default ForgotPassword;
