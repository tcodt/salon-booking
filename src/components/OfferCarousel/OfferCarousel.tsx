import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useThemeColor } from "../../context/ThemeColor";
import { useDisplaySlider } from "../../hooks/sliders/useDisplaySlider";
import Loading from "../Loading/Loading";

const OfferCarousel: React.FC = () => {
  const { data: sliders, isPending, isError, isFetched } = useDisplaySlider();
  const { themeColor } = useThemeColor();

  // Never toast during render
  useEffect(() => {
    if (isError) {
      // silent — backend 500 is not actionable for the user
      console.warn("sliders unavailable");
    }
  }, [isError]);

  if (isPending) return <Loading />;

  // Backend 500 or empty → hide carousel, don't crash home
  if (isError || !sliders?.length) {
    if (isFetched && !isError) return null;
    return null;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={sliders.length > 1}
    >
      {sliders.map((slider) => (
        <SwiperSlide key={slider.id}>
          <motion.div
            className={`relative z-20 flex h-44 flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-${themeColor}-500 to-${themeColor}-700 p-5 shadow-lg`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-bold text-white">{slider.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/85">
              {slider.sub_title}
            </p>
            <span className="mt-auto self-start rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              پیشنهاد ویژه
            </span>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default OfferCarousel;
