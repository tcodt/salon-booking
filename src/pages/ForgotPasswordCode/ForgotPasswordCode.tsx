import React, { useState } from "react";
import PageBar from "../../components/PageBar/PageBar";
import { useLocation, useNavigate } from "react-router";
import CodeInput from "../../components/CodeInput/CodeInput";
import Button from "../../components/Button/Button";
import { useThemeColor } from "../../context/ThemeColor";
import { useVerifyResetCode } from "../../hooks/accounts/verify-reset-code/useVerifyResetCode";
import toast from "react-hot-toast";

const ForgotPasswordCode: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const { themeColor } = useThemeColor();
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber =
    (location.state as { phoneNumber?: string })?.phoneNumber || "";
  const verifyResetCodeMutation = useVerifyResetCode();

  const handleCodeComplete = (enteredCode: string) => {
    setCode(enteredCode);
    setIsCodeComplete(true);
  };

  const maskedPhone = phoneNumber
    ? `${phoneNumber.slice(0, 4)}***${phoneNumber.slice(-4)}`
    : "شماره نامشخص";

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!code || code.length !== 5) {
      toast.error("لطفاً کد ۶ رقمی را کامل وارد کنید");
      return;
    }

    if (!phoneNumber) {
      toast.error("شماره تلفن یافت نشد!");
      navigate("/forgot-password");
      return;
    }

    verifyResetCodeMutation.mutate(
      { phoneNumber, code },
      {
        onSuccess: () => {
          toast.success("کد تأیید شد!");
          navigate("/change-password", {
            state: { phoneNumber },
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const message =
            error?.response?.data?.code?.[0] ||
            error?.response?.data?.detail ||
            "کد وارد شده اشتباه است";
          toast.error(message);
          setCode("");
          setIsCodeComplete(false);
          // اختیاری: اینپوت‌ها رو ریست کن (با ref یا state)
        },
      }
    );
    // navigate("/change-password");
  };

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <section className="p-4 flex flex-col justify-between h-screen">
      <PageBar title="کد بازیابی" handleClick={getBackToPreviousPage} />

      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-8 w-full max-w-xs">
          <p className="text-base text-gray-600 font-medium text-center leading-7">
            کد برای شماره{" "}
            <span dir="ltr" className="text-base text-gray-800 font-bold">
              {maskedPhone}
            </span>{" "}
            ارسال شد
          </p>
          <CodeInput length={5} onComplete={handleCodeComplete} />
          <button
            type="button"
            // onClick={handleResendCode}
            className={`text-base font-medium underline cursor-pointer hover:text-${themeColor}-500 transition`}
          >
            ارسال دوباره کد
          </button>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={verifyResetCodeMutation.isPending || !isCodeComplete}
      >
        {verifyResetCodeMutation.isPending ? "در حال بررسی..." : "تایید"}
      </Button>
    </section>
  );
};

export default ForgotPasswordCode;
