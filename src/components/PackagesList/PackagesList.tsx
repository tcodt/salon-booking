import React from "react";
import { useGetPackages } from "../../hooks/packages/useGetPackages";
import toast from "react-hot-toast";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { GiCoffeeCup } from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router";

const PackagesList: React.FC = () => {
  const { data: packages, isError, error } = useGetPackages();
  const navigate = useNavigate();

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
      pagination={true}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {packages?.map((item) => (
        <SwiperSlide key={item?.id}>
          <div>
            <div className="bg-white h-auto w-full p-4 rounded-xl shadow-md flex flex-col gap-8">
              <div className="space-y-4">
                <Link to={`/packages/${item?.id}`} className="block">
                  <img
                    src={
                      item?.image
                        ? `https://queuingprojectapi.pythonanywhere.com${item?.image}`
                        : "/images/no-image.jpg"
                    }
                    alt="Package Image"
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </Link>
                <Link
                  to={`/packages/${item?.id}`}
                  className="text-lg font-semibold block"
                >
                  {item?.name}
                </Link>
                <p className="text-gray-600 line-clamp-2 text-sm">
                  {item?.desc}
                </p>
                <div className="flex flex-row items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <HiOutlineBuildingOffice className="text-2xl text-orange-500" />
                    <p className="text-sm font-medium text-gray-500">
                      {item?.business?.name}
                    </p>
                  </div>
                  {item?.business?.is_coffee_shop && (
                    <div className="flex items-center gap-2">
                      <GiCoffeeCup className="text-2xl text-orange-500" />
                      <p className="text-sm font-medium text-gray-500">
                        کافی شاپ
                      </p>
                    </div>
                  )}
                  {item?.business?.is_parking && (
                    <div className="flex items-center gap-2">
                      <LuCircleParking className="text-2xl text-orange-500" />
                      <p className="text-sm font-medium text-gray-500">
                        پارکینگ
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-orange-600 line-clamp-2 text-left text-base">
                  {item?.total_price} تومان
                </p>
              </div>
              <Button onClick={() => navigate(`/packages/${item?.id}`)}>
                نمایش بیشتر
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PackagesList;
