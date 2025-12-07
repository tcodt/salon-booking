import React, { useState } from "react";
import PageBar from "../../components/PageBar/PageBar";
import { useLocation, useNavigate } from "react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Button from "../../components/Button/Button";
import { LuCircleCheckBig } from "react-icons/lu";
import Loading from "../../components/Loading/Loading";
import { useThemeColor } from "../../context/ThemeColor";
import { TbLockPassword } from "react-icons/tb";
import toast from "react-hot-toast";
import { useResetPassword } from "../../hooks/accounts/reset-password/useResetPassword";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeColor } = useThemeColor();

  const phoneNumber =
    (location.state as { phoneNumber: string })?.phoneNumber || "";

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const resetMutation = useResetPassword();

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const toggleConfirm = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!phoneNumber) {
      toast.error("شماره تلفن یافت نشد. دوباره تلاش کنید.");
      navigate("/forgot-password");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    resetMutation.mutate(
      { phoneNumber, password: newPassword },
      {
        onSuccess: () => {
          toast.success("رمز عبور با موفقیت تغییر کرد");
          // می‌تونی مستقیم لاگین کنی یا بفرستی به صفحه ورود
          navigate("/login", { replace: true });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const msg =
            error?.response?.data?.password?.[0] ||
            error?.response?.data?.detail ||
            "خطا در تغییر رمز عبور";
          toast.error(msg);
        },
      }
    );
  };

  return (
    <section className="p-4 flex flex-col justify-between h-screen gap-4">
      <PageBar title="رمز عبور جدید" handleClick={getBackToPreviousPage} />
      <div className="space-y-20">
        <div className="flex justify-center items-center">
          <TbLockPassword size={70} className={`text-${themeColor}-500`} />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base text-gray-600 font-medium">
            ایجاد رمز عبور جدید
          </p>
          <label className="md:w-2/4 w-full relative">
            <span
              className="absolute top-4 right-2 text-gray-500 text-lg"
              onClick={toggle}
            >
              {isVisible ? <IoEye /> : <IoEyeOff />}
            </span>
            <input
              type={!isVisible ? "password" : "text"}
              placeholder="رمز عبور"
              maxLength={12}
              className="primary-input ps-8"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="absolute top-4 left-2 text-gray-500 text-lg">
              <IoIosLock />
            </div>
          </label>
          <label className="md:w-2/4 w-full relative">
            <span
              className="absolute top-4 right-2 text-gray-500 text-lg"
              onClick={toggleConfirm}
            >
              {isConfirmVisible ? <IoEye /> : <IoEyeOff />}
            </span>
            <input
              type={!isConfirmVisible ? "password" : "text"}
              placeholder="تکرار رمز عبور"
              maxLength={12}
              className="primary-input ps-8"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <div className="absolute top-4 left-2 text-gray-500 text-lg">
              <IoIosLock />
            </div>
          </label>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal p-4 rounded-xl shadow-xl w-full">
        <div className="modal-box">
          <div className="flex flex-col items-center justify-center gap-6">
            <LuCircleCheckBig size={60} className="text-orange-500" />
            <h4 className="text-lg text-orange-500 font-semibold">تبریک!</h4>
            <p className="text-base text-gray-600 font-medium text-center">
              رمز عبور شما با موفقیت تغییر داده شد. شما بزودی به صفحه اصلی منتقل
              خواهید شد
            </p>
            <Loading />
          </div>
        </div>
      </dialog>

      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={resetMutation.isPending}
      >
        {resetMutation.isPending ? "در حال تغییر..." : "تغییر رمز عبور"}
      </Button>
    </section>
  );
};

export default ChangePassword;
