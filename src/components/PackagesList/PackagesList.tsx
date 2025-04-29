import React from "react";
import { useGetPackages } from "../../hooks/packages/useGetPackages";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

const PackagesList: React.FC = () => {
  const { data: packages, isError, error } = useGetPackages();
  console.log("Packages: ", packages);

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
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {packages?.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="bg-white border border-gray-300 h-44 w-full p-4 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h5 className="text-lg font-semibold mb-2">{item.name}</h5>
              <p className="text-gray-600 line-clamp-2">{item.desc}</p>
              <p className="text-gray-600 line-clamp-2">
                {item.total_price} هزارتومان
              </p>
            </div>
            <button className="bg-orange-500 text-white rounded-xl py-2 px-4">
              خرید
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PackagesList;
