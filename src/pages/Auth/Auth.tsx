import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useThemeColor } from "../../context/ThemeColor";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { themeColor } = useThemeColor();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <section
      className="flex items-center justify-center h-screen w-screen overflow-hidden"
      id="auth_bg"
    >
      <div className="flex flex-col gap-8 items-center max-w-[400px] p-4 text-center">
        <div
          className={`rounded-full bg-white p-2 border-4 border-${themeColor}-500`}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[150px] h-[150px] object-contain"
          />
        </div>
        <p className="text-base font-medium text-zinc-100">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است.
        </p>

        <div className="flex flex-col gap-4 w-full items-center">
          <button
            className={` bg-${themeColor}-500 text-white transition text-base font-medium rounded-xl w-8/12 py-2 px-4 cursor-pointer hover:bg-${themeColor}-600 h-11`}
            onClick={() => navigate("/login")}
          >
            ورود
          </button>
          <button
            className={`bg-${themeColor}-500 text-white transition text-base font-medium rounded-xl w-8/12 py-2 px-4 cursor-pointer hover:bg-${themeColor}-600 h-11`}
            onClick={() => navigate("/register")}
          >
            ثبت نام
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
