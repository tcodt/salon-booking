import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import PageBar from "../../components/PageBar/PageBar";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useThemeColor } from "../../context/ThemeColor";
import { useSendResetCode } from "../../hooks/accounts/send-reset-code/useSendResetCode";
import toast from "react-hot-toast";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { themeColor } = useThemeColor();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const sendResetCodeMutation = useSendResetCode();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (phoneNumber.length !== 11)
      return toast.error("شماره موبایل باید 11 رقم باشد");

    sendResetCodeMutation.mutate(phoneNumber, {
      onSuccess: () => {
        toast.success("کد تأیید ارسال شد");
        navigate("/receive-code", {
          state: { phoneNumber },
        });
      },
      onError: () => {
        toast.error("شماره موبایل معتبر نیست یا مشکلی پیش آمده");
      },
    });
  };

  return (
    <section className="p-4">
      <PageBar title="بازنشانی رمز عبور" handleClick={getBackToPreviousPage} />

      <form className="flex flex-col gap-8 mt-12 pb-4">
        <div className="flex items-center justify-center">
          <TbPasswordFingerprint
            size={70}
            className={`text-${themeColor}-500`}
          />
        </div>
        <p className="text-base text-gray-700 font-medium text-center">
          شماره موبایل خود را وارد کنید
        </p>
        <input
          type="tel"
          inputMode="numeric"
          className="primary-input"
          placeholder="شماره موبایل"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
          }
          minLength={11}
          maxLength={11}
        />
        <Button type="submit" onClick={handleSubmit}>
          {sendResetCodeMutation.isPending ? "منتظر بمانید..." : " ادامه"}
        </Button>
      </form>
    </section>
  );
};

export default ForgotPassword;
