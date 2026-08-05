import { useState } from "react";
import { LuKeyRound } from "react-icons/lu";

const RandomCodeInput = () => {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    console.log(code);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary-green-600 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <LuKeyRound className="h-8 w-8 text-white" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            ورود به کسب‌وکار
          </h1>

          <p className="mt-2 text-sm text-blue-100 leading-6">
            لطفاً کد اختصاصی کسب‌وکار را وارد کنید تا ادامه دهید.
          </p>
        </div>

        {/* Body */}
        <div className="p-6" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              کد کسب‌وکار
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="مثلاً A8X4K2"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-lg tracking-[0.35em] font-semibold uppercase outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <p className="text-xs text-slate-500">
              این کد توسط مدیر یا مالک کسب‌وکار در اختیار شما قرار می‌گیرد.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!code.trim()}
            className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            ادامه
          </button>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">کد را ندارید؟</p>

            <button
              type="button"
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              درخواست کد از مدیر کسب‌وکار
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCodeInput;
