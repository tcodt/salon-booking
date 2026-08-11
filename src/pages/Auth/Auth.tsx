import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useThemeColor } from "../../context/ThemeColor";
import { logoMap } from "../../utils/logoMap";
import Button from "../../components/Button/Button";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { themeColor } = useThemeColor();
  const logoSrc = logoMap[themeColor] || "/images/logo-main.jpg";

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <section
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      id="auth_bg"
    >
      {/* Soft overlay content card */}
      <motion.div
        className="relative z-10 mx-4 w-full max-w-md rounded-3xl border border-white/20 bg-black/40 p-8 text-center shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-${themeColor}-300 bg-${themeColor}-100 shadow-lg`}
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={logoSrc}
            alt="لوگو سالن"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <h1 className="text-2xl font-bold text-white">سالن زیبایی نارژین</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-200">
          برای رزرو نوبت و استفاده از خدمات، وارد حساب خود شوید یا ثبت‌نام کنید.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Button type="button" onClick={() => navigate("/login")}>
            ورود به حساب
          </Button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="h-12 w-full rounded-full border-2 border-white/40 bg-transparent text-base font-medium text-white transition hover:bg-white/10"
          >
            ساخت حساب جدید
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          با ادامه، شرایط استفاده از خدمات را می‌پذیرید.
        </p>
      </motion.div>
    </section>
  );
};

export default Auth;
