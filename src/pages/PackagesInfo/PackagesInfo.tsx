import React from "react";
import { useParams } from "react-router";
import { useGetPackageById } from "../../hooks/packages/useGetPackageById";
import Loading from "../../components/Loading/Loading";
import {
  HiMiniDevicePhoneMobile,
  HiOutlineBuildingOffice,
} from "react-icons/hi2";
import { GiCoffeeCup, GiRotaryPhone } from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { useThemeColor } from "../../context/ThemeColor";

const PackagesInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const packageId = Number(id);
  const { data: packageData, isPending } = useGetPackageById(packageId);
  const { themeColor } = useThemeColor();

  if (isPending) return <Loading />;

  return (
    <section>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4 dark:bg-gray-700">
          <div>
            <img
              src={
                packageData?.image
                  ? `https://queuingprojectapi.pythonanywhere.com${packageData.image}`
                  : "/images/no-image.jpg"
              }
              alt="Packge Image"
              className="rounded-xl h-48 w-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {packageData?.name}
          </h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {packageData?.desc}
          </p>
          <ul className={`list-disc marker:text-${themeColor}-500 ms-4`}>
            {packageData?.services.map((service) => (
              <li
                key={service.id}
                className="text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                {service.name}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4 dark:bg-gray-700">
          <div className="space-y-4">
            <p className="text-base font-medium text-gray-800 flex items-center gap-2 dark:text-white">
              <HiOutlineBuildingOffice
                className={`text-2xl text-${themeColor}-500`}
              />{" "}
              {packageData?.business.name}
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              <span className="text-gray-800 dark:text-white">آدرس:</span>{" "}
              {packageData?.business.address}
            </p>
          </div>
          <div className="flex flex-row items-center gap-4 flex-wrap">
            {packageData?.business?.is_coffee_shop && (
              <div className="flex items-center gap-2">
                <GiCoffeeCup className={`text-2xl text-${themeColor}-500`} />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  کافی شاپ
                </p>
              </div>
            )}
            {packageData?.business?.is_parking && (
              <div className="flex items-center gap-2">
                <LuCircleParking
                  className={`text-2xl text-${themeColor}-500`}
                />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  پارکینگ
                </p>
              </div>
            )}
            <a
              href={packageData?.business?.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaInstagram className={`text-2xl text-${themeColor}-500`} />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                اینستاگرام
              </p>
            </a>
            <a
              href={`tel:${packageData?.business.phone_number}`}
              className="flex items-center gap-2"
            >
              <HiMiniDevicePhoneMobile
                className={`text-2xl text-${themeColor}-500`}
              />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                تماس: {packageData?.business.phone_number}
              </p>
            </a>
            <a
              href={`tel:${packageData?.business.telephone_number}`}
              className="flex items-center gap-2"
            >
              <GiRotaryPhone className={`text-2xl text-${themeColor}-500`} />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                تلفن: {packageData?.business.telephone_number}
              </p>
            </a>
          </div>
        </div>
        <hr />
        <div className="flex flex-row items-center justify-between">
          <span className={`text-base font-medium text-${themeColor}-500`}>
            {packageData?.total_price.toLocaleString()} تومان
          </span>
          <Button>خرید پکیج</Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesInfo;
