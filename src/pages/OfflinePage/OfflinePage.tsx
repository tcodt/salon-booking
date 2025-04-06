import React from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";

const OfflinePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate(-1); // Go back to the previous page
    } else {
      toast.error(
        "شما هنوز آفلاین هستید. لطفاً اتصال اینترنت خود را بررسی کنید."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/images/no-internet.svg"
        alt="No Internet"
        className="w-full object-cover"
      />
      <div className="max-w-md w-full p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          شما آفلاین هستید
        </h1>
        <p className="text-gray-600 mb-6">
          به نظر می‌رسد اتصال اینترنت شما قطع شده است. لطفاً اتصال خود را بررسی
          کنید و دوباره تلاش کنید.
        </p>
        <Button onClick={handleRetry}>تلاش دوباره</Button>
      </div>
    </div>
  );
};

export default OfflinePage;
