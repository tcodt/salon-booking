import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { registerFn } from "../../../services/accounts/register/registerFn";
import { clearAuthTokens, storeAuthTokens } from "../../../utils/tokenHelper";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// تعریف نوع پاسخ خطای سرور (بر اساس چیزی که از بک‌اند می‌گیری)
interface ApiErrorResponse {
  phone_number?: string[];
  non_field_errors?: string[];
  detail?: string[];
  [key: string]: string[] | undefined; // برای فیلدهای دیگه در آینده
}

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      storeAuthTokens(data);
      queryClient.setQueryData(["userProfile"], data.user);
      loginContext({ access: data.access, refresh: data.refresh }, data.user);
      toast.success("ثبت‌نام با موفقیت انجام شد!");
      navigate("/");
    },
    onError: (error: unknown) => {
      // اول AxiosError بودن رو چک می‌کنیم
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        // چک می‌کنیم response و data وجود داره
        const errorData = axiosError.response?.data;

        if (errorData) {
          // اولویت: خطای شماره تلفن
          if (errorData.phone_number && errorData.phone_number.length > 0) {
            toast.error(errorData.phone_number[0]); // فقط اولین پیام رو نشون بده
            return;
          }

          // خطاهای عمومی مثل non_field_errors یا detail
          if (errorData.non_field_errors?.[0]) {
            toast.error(errorData.non_field_errors[0]);
            return;
          }

          if (errorData.detail?.[0]) {
            toast.error(errorData.detail[0]);
            return;
          }

          // اگر خطای فیلد دیگه‌ای بود (مثل password, email و ...)
          const firstFieldError = Object.values(errorData).find(
            (arr) => Array.isArray(arr) && arr.length > 0
          );
          if (firstFieldError && typeof firstFieldError[0] === "string") {
            toast.error(firstFieldError[0]);
            return;
          }
        }

        // اگر هیچ خطای خاصی نبود، خطای عمومی 400
        if (axiosError.response?.status === 400) {
          toast.error("اطلاعات وارد شده معتبر نیست.");
          return;
        }
      }

      // خطای غیرمنتظره (مثل مشکل شبکه)
      console.error("Register error:", error);
      toast.error("خطایی رخ داد! لطفاً دوباره تلاش کنید.");
      clearAuthTokens();
    },
  });
};
