import React, { useState } from "react";
import PageBar from "../../components/PageBar/PageBar";
import { useNavigate } from "react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Button from "../../components/Button/Button";
import { LuCircleCheckBig } from "react-icons/lu";
import Loading from "../../components/Loading/Loading";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  };

  return (
    <section className="p-4 flex flex-col justify-between h-screen gap-4">
      <PageBar title="رمز عبور جدید" handleClick={getBackToPreviousPage} />
      <div>
        <img
          src="/images/complete-pic.svg"
          alt="Forgot Password Image"
          className="h-[300px] w-[300px] object-contain mx-auto"
        />
        <p className="text-base text-gray-600 font-medium mb-2 mt-8">
          ایجاد رمز عبور جدید
        </p>
        <label className="md:w-2/4 w-full relative">
          <span
            className="absolute top-1 right-2 text-gray-500 text-lg"
            onClick={toggle}
          >
            {isVisible ? <IoEye /> : <IoEyeOff />}
          </span>
          <input
            type={!isVisible ? "password" : "text"}
            placeholder="رمز عبور"
            maxLength={12}
            className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-8 rounded-xl text-left text-gray-800 font-medium text-base h-12 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="absolute top-1 left-2 text-gray-500 text-lg">
            <IoIosLock />
          </div>
        </label>
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

      <Button type="submit" onClick={handleSubmit}>
        ادامه
      </Button>
    </section>
  );
};

export default ChangePassword;
