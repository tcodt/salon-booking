import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useGetSliders } from "../../hooks/sliders/useGetSliders";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const OfferCarousel: React.FC = () => {
  const { data: sliders, isPending, isError, error } = useGetSliders();

  const styleVariant = [
    {
      color: "bg-rose-100",
      textColor: "text-rose-800",
      buttonColor: "bg-rose-500 hover:bg-rose-600",
    },
    {
      color: "bg-blue-100",
      textColor: "text-blue-800",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      color: "bg-green-100",
      textColor: "text-green-800",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    {
      color: "bg-purple-100",
      textColor: "text-purple-800",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
    {
      color: "bg-amber-100",
      textColor: "text-amber-800",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  if (isPending) return <Loading />;

  if (isError) {
    console.log(error);
    toast.error("خطا در بارگذاری اسلایدر!");
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="pb-10"
    >
      {sliders?.map((slider) => {
        const variant =
          styleVariant[Math.floor(Math.random() * styleVariant.length)];
        return (
          <SwiperSlide key={slider.id}>
            <div
              className={`${variant.color} ${variant.textColor} rounded-xl shadow-md p-6 h-52 flex flex-col`}
            >
              <h3 className="text-xl font-bold mb-3">{slider.title}</h3>
              <p className="mb-4">{slider.sub_title}</p>
              <button
                className={`${variant.buttonColor} text-white font-medium py-2 px-4 rounded-xl mt-auto self-start transition-colors duration-300`}
              >
                رزرو آنلاین
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default OfferCarousel;
