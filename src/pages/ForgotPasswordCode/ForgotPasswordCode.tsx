import React, { useEffect, useState } from "react";
import PageBar from "../../components/PageBar/PageBar";
import { useNavigate } from "react-router";
import CodeInput from "../../components/CodeInput/CodeInput";
import Button from "../../components/Button/Button";

const ForgotPasswordCode: React.FC = () => {
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/change-password");
  };

  return (
    <section className="p-4 flex flex-col justify-between h-screen">
      <PageBar title="بازنشانی رمز عبور" handleClick={getBackToPreviousPage} />

      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-8">
          <p className="text-base text-gray-600 font-medium">
            کد برای شماره{" "}
            <span dir="ltr" className="text-base text-gray-800 font-medium">
              {userPhoneNumber.slice(0, 4) + "***" + userPhoneNumber.slice(7)}
            </span>{" "}
            ارسال شد
          </p>
          <CodeInput />
          <button
            type="button"
            className="text-base text-gray-600 font-medium underline cursor-pointer hover:text-orange-500 transition"
          >
            ارسال دوباره کد
          </button>
        </div>
      </div>
      <Button type="submit" onClick={handleSubmit}>
        تایید
      </Button>
    </section>
  );
};

export default ForgotPasswordCode;
