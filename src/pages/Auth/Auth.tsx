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
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <section
      className="flex items-center justify-center h-screen w-screen overflow-hidden"
      id="auth_bg"
    >
      <div className="flex flex-col gap-8 items-center max-w-[400px] p-4 text-center">
        <motion.div
          className={` bg-${themeColor}-200 shadow-md border-2 border-${themeColor}-300 rounded-full w-40 h-40`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1.1, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 5,
            ease: "easeOut",
          }}
        >
          <img
            src={logoSrc}
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <p className="text-base font-medium text-zinc-100">
          به سالن زیبایی نارژین خوش آمدید! لطفا برای استفاده از خدمات سالن
          زیبایی یکی از روش های زیر را انتخاب کنید.
        </p>

        <div className="flex flex-col gap-4 w-full items-center">
          <Button onClick={() => navigate("/login")}>ورود</Button>
          <Button onClick={() => navigate("/register")}>ثبت نام</Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
