import React from "react";
import toast from "react-hot-toast";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { GiCoffeeCup } from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router";
import { useThemeColor } from "../../context/ThemeColor";
import { motion } from "framer-motion";
import { useDisplayPackages } from "../../hooks/packages/useDisplayPackages";

const PackagesList: React.FC = () => {
  const { data: packages, isError, error } = useDisplayPackages();
  const navigate = useNavigate();
  const { themeColor } = useThemeColor();

  // Function to format price to Persian format
  const formatPrice = (price: string) => {
    if (!price) return "۰";
    return new Intl.NumberFormat("fa-IR").format(Number(price));
  };

  if (isError) {
    console.log(error);
    toast.error("خطا در دریافت پکیج ها");
  }

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={false}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {packages?.map((item) => (
        <SwiperSlide key={item?.id}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            // whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            // viewport={{ once: false, amount: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-700 dark:border-none border border-slate-300 h-auto w-full rounded-xl shadow-md flex flex-col gap-8 relative z-10">
              <div className="space-y-4">
                <Link to={`/packages/${item?.id}`} className="block">
                  <img
                    src={
                      item?.image
                        ? `https://api.narjin.ir${item?.image}`
                        : "/images/no-image.jpg"
                    }
                    alt="Package Image"
                    className="rounded-xl h-40 w-full object-cover cursor-pointer"
                  />
                </Link>
                <div className="space-y-4 p-4">
                  <Link
                    to={`/packages/${item?.id}`}
                    className="text-gray-700 dark:text-white text-lg font-semibold block"
                  >
                    {item?.name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                    {item?.desc}
                  </p>
                  <div className="flex flex-row items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <HiOutlineBuildingOffice
                        className={`text-2xl text-${themeColor}-500 dark:text-${themeColor}-400`}
                      />
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {item?.business?.name}
                      </p>
                    </div>
                    {item?.business?.is_coffee_shop && (
                      <div className="flex items-center gap-2">
                        <GiCoffeeCup
                          className={`text-2xl text-${themeColor}-500 dark:text-${themeColor}-400`}
                        />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          کافی شاپ
                        </p>
                      </div>
                    )}
                    {item?.business?.is_parking && (
                      <div className="flex items-center gap-2">
                        <LuCircleParking
                          className={`text-2xl text-${themeColor}-500 dark:text-${themeColor}-400`}
                        />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          پارکینگ
                        </p>
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-${themeColor}-600 dark:text-${themeColor}-400 line-clamp-2 text-left text-base`}
                  >
                    {formatPrice(item?.total_price)} تومان
                  </p>
                  <Button onClick={() => navigate(`/packages/${item?.id}`)}>
                    نمایش بیشتر
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PackagesList;
