import { useState } from "react";
import { useNavigate } from "react-router";
import { LuKeyRound } from "react-icons/lu";
import { useResolveBusiness } from "../../hooks/business/useResolveBusiness";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";

const RandomCodeInput = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const resolveMutation = useResolveBusiness();
  const { setJoinedBusiness } = useJoinedBusiness();

  const handleSubmit = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    resolveMutation.mutate(trimmed, {
      onSuccess: (business) => {
        const safeBusiness = {
          ...business,
          name: business?.name?.trim() || `سالن ${code.trim().toUpperCase()}`,
          random_code: business?.random_code || code.trim().toUpperCase(),
        };

        setJoinedBusiness(safeBusiness);

        toast.success(`به «${safeBusiness.name}» متصل شدید`);
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
            const detail = data?.detail;
            const message =
              typeof detail === "string"
                ? detail
                : Array.isArray(detail)
                  ? String(detail[0])
                  : data?.message || "کد نامعتبر است";
            toast.error(message);
            return;
          }
        }
        toast.error("خطا در اتصال به کسب‌وکار. دوباره تلاش کنید.");
      },
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 min-h-full">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-primary-green-600 dark:bg-primary-green-700 p-8 text-center">
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

        {/* Body */}
        <div className="p-6" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-200">
              کد کسب‌وکار
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="مثلاً A8X4K2"
              maxLength={12}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 px-4 py-3 text-center text-lg tracking-[0.35em] font-semibold uppercase text-gray-800 dark:text-gray-100 outline-none transition focus:border-primary-green-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-4 focus:ring-primary-green-100 dark:focus:ring-primary-green-900/40"
            />
            <p className="text-xs text-slate-500 dark:text-gray-400">
              این کد را از مدیر یا مالک سالن دریافت کنید.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!code.trim() || resolveMutation.isPending}
            className="mt-8 w-full rounded-xl bg-primary-green-600 py-3.5 font-semibold text-white transition hover:bg-primary-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-gray-600"
          >
            {resolveMutation.isPending ? "در حال بررسی..." : "ادامه"}
          </button>

          <div className="mt-6 rounded-xl bg-slate-50 dark:bg-gray-700/50 p-4 text-center">
            <p className="text-sm text-slate-600 dark:text-gray-300">
              مالک سالن هستید؟
            </p>
            <button
              type="button"
              onClick={() => navigate("/role-authentication")}
              className="mt-2 text-sm font-semibold text-primary-green-600 dark:text-primary-green-400 hover:text-primary-green-700 dark:hover:text-primary-green-300"
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
