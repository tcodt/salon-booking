import { useNavigate } from "react-router";
import SalonCodeForm from "../../components/SalonCodeForm/SalonCodeForm";
import { useUserType } from "../../context/UserTypeContext";
import { useAuth } from "../../context/AuthContext";

const RandomCodeInput = () => {
  const navigate = useNavigate();
  const { setUserType } = useUserType();
  const { isAuthenticated } = useAuth();

  return (
    <SalonCodeForm
      title="ثبت‌نام مشتری"
      description="کد سالن را وارد کنید. باید وارد حساب کاربری شده باشید."
      submitLabel="تأیید و ادامه"
      showCurrentSalon={false}
      onBack={() => navigate(-1)}
      onExitPublic={() =>
        navigate(isAuthenticated ? "/home" : "/auth", { replace: true })
      }
      exitPublicLabel={isAuthenticated ? "خانه" : "صفحه ورود"}
      onSuccess={() => {
        setUserType("customer");
        navigate("/home", { replace: true });
      }}
      footer={
        <div className="space-y-2 pt-3 text-center">
          <button
            type="button"
            onClick={() => navigate("/role-authentication")}
            className="block w-full text-sm font-semibold text-primary-green-600"
          >
            بازگشت به انتخاب نقش
          </button>
          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="block w-full text-sm text-slate-500"
            >
              ورود به حساب
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="block w-full text-sm text-slate-400"
          >
            صفحه اصلی احراز هویت
          </button>
        </div>
      }
    />
  );
};

export default RandomCodeInput;
