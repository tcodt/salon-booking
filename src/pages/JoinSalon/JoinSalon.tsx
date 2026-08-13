import { useNavigate } from "react-router";
import SalonCodeForm from "../../components/SalonCodeForm/SalonCodeForm";

/**
 * Logged-in customer: join or switch salon without going through registration.
 */
const JoinSalon = () => {
  const navigate = useNavigate();

  return (
    <SalonCodeForm
      title="ورود به سالن"
      description="کد سالن را وارد کنید تا خدمات، بنرها و رزرو همان کسب‌وکار برای شما فعال شود."
      submitLabel="اتصال به سالن"
      showCurrentSalon
      onBack={() => navigate(-1)}
      onExitPublic={() => navigate("/home")}
      exitPublicLabel="خانه"
      onSuccess={() => navigate("/home", { replace: true })}
      footer={
        <div className="space-y-2 pt-2 text-center">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="text-sm text-slate-500 hover:text-slate-700 dark:text-gray-400"
          >
            انصراف و بازگشت به خانه
          </button>
        </div>
      }
    />
  );
};

export default JoinSalon;
