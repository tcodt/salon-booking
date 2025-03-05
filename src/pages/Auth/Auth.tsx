import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const itemData = [
    {
      img: "/images/authImage/auth-pic-1.jpg",
      title: "Image 1",
    },
    {
      img: "/images/authImage/auth-pic-2.avif",
      title: "Image 2",
    },
    {
      img: "/images/authImage/auth-pic-3.jpg",
      title: "Image 3",
    },
    {
      img: "/images/authImage/auth-pic-4.webp",
      title: "Image 4",
    },
    {
      img: "/images/authImage/auth-pic-5.jpg",
      title: "Image 5",
    },
    {
      img: "/images/authImage/auth-pic-6.avif",
      title: "Image 6",
    },
  ];

  return (
    <>
      <div className="absolute top-0 left-0 blur-xs">
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}`}
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <section className="flex items-center justify-center min-h-screen z-50 relative">
        <div className="flex flex-col gap-8 items-center max-w-[400px] bg-white rounded-xl shadow-lg shadow-black p-4 text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[150px] h-[150px] object-contain"
          />
          <p className="text-base font-medium text-gray-600">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>

          <div className="flex flex-col gap-4 w-full items-center">
            <button
              className="border border-slate-500 text-slate-600 hover:bg-slate-800 hover:text-white transition text-base font-medium rounded-xl w-8/12 py-2 px-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              ورود
            </button>
            <button
              className="border border-slate-500 text-slate-600 hover:bg-slate-800 hover:text-white transition text-base font-medium rounded-xl w-8/12 py-2 px-4 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              ثبت نام
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
