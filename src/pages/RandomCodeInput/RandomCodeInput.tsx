import { useState } from "react";
import { useNavigate } from "react-router";
import { LuKeyRound } from "react-icons/lu";
import { useResolveBusiness } from "../../hooks/business/useResolveBusiness";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const JOINED_BUSINESS_KEY = "joinedBusiness";

const RandomCodeInput = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const resolveMutation = useResolveBusiness();

  const handleSubmit = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    resolveMutation.mutate(trimmed, {
      onSuccess: (business) => {
        localStorage.setItem(JOINED_BUSINESS_KEY, JSON.stringify(business));
        toast.success(`به «${business.name}» متصل شدید`);
        navigate("/home");
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          const data = error.response?.data as
            | { detail?: string; message?: string }
            | undefined;

          if (status === 404) {
            toast.error("کد کسب‌وکار یافت نشد");
            return;
          }
          if (status === 400) {
            toast.error(data?.detail || data?.message || "کد نامعتبر است");
            return;
          }
        }
        toast.error("خطا در اتصال به کسب‌وکار. دوباره تلاش کنید.");
      },
    });
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 min-h-full">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-primary-green-600 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <LuKeyRound className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-white">
            ورود به کسب‌وکار
          </h1>
          <p className="mt-2 text-sm text-white/90 leading-6">
            کد اختصاصی سالن را وارد کنید تا خدمات همان کسب‌وکار را ببینید.
          </p>
        </div>

        <div className="p-6" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              کد کسب‌وکار
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="مثلاً A8X4K2"
              maxLength={12}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-lg tracking-[0.35em] font-semibold uppercase outline-none transition focus:border-primary-green-500 focus:bg-white focus:ring-4 focus:ring-primary-green-100"
            />
            <p className="text-xs text-slate-500">
              این کد را از مدیر یا مالک سالن دریافت کنید.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!code.trim() || resolveMutation.isPending}
            className="mt-8 w-full rounded-xl bg-primary-green-600 py-3.5 font-semibold text-white transition hover:bg-primary-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {resolveMutation.isPending ? "در حال بررسی..." : "ادامه"}
          </button>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">مالک سالن هستید؟</p>
            <button
              type="button"
              onClick={() => navigate("/role-authentication")}
              className="mt-2 text-sm font-semibold text-primary-green-600 hover:text-primary-green-700"
            >
              بازگشت به انتخاب نقش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCodeInput;
