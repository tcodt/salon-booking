import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const OfferCarousel: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: "ویژه مشتریان جدید",
      description: "۱۵٪ تخفیف برای اولین نوبت‌گیری آنلاین شما",
      color: "bg-rose-100",
      textColor: "text-rose-800",
      buttonColor: "bg-rose-500 hover:bg-rose-600",
    },
    {
      id: 2,
      title: "پیشنهاد ویژه آخر هفته",
      description: "نوبت‌گیری آنلاین جمعه و پنجشنبه با ۲۰٪ تخفیف",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: 3,
      title: "بسته خانوادگی",
      description: "نوبت‌گیری همزمان برای ۳ نفر با ۲۵٪ تخفیف",
      color: "bg-green-100",
      textColor: "text-green-800",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    {
      id: 4,
      title: "عضویت ویژه",
      description: "ثبت‌نام در سایت و دریافت کوپن ۳۰٪ تخفیف",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: 5,
      title: "سرویس کامل زنانه",
      description: "کوتاهی، رنگ و مش با ۱۰٪ تخفیف",
      color: "bg-amber-100",
      textColor: "text-amber-800",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
  ];

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
      {offers.map((offer) => (
        <SwiperSlide key={offer.id}>
          <div
            className={`${offer.color} ${offer.textColor} rounded-xl shadow-lg p-6 h-52 flex flex-col`}
          >
            <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
            <p className="mb-4">{offer.description}</p>
            <button
              className={`${offer.buttonColor} text-white font-medium py-2 px-4 rounded-xl mt-auto self-start transition-colors duration-300`}
            >
              رزرو آنلاین
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OfferCarousel;
