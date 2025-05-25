import React from "react";
import { getGreeting } from "../../utils/greetings";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router";
import OfferCarousel from "../../components/OfferCarousel/OfferCarousel";
import PackagesList from "../../components/PackagesList/PackagesList";
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { useThemeColor } from "../../context/ThemeColor";

const HomePage: React.FC = () => {
  const { data: userProfile } = useGetProfile();
  const username = userProfile?.first_name;
  const greetingUser = getGreeting(username);
  const { themeColor } = useThemeColor();

  return (
    <section className="space-y-6">
      {/* User Name */}
      <h3 className="text-2xl font-bold text-gray-800 my-3">{greetingUser}</h3>
      {/* Search Bar */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="جستجو"
          className={`py-2 px-4 h-11 bg-white w-full rounded-xl border-2 focus:border-${themeColor}-500 transition outline-none`}
        />
        <CiSearch size={25} className="absolute top-2 left-2 text-gray-500" />
      </div>
      {/* Offer Box */}
      <OfferCarousel />
      {/* Booking */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r z-10 from-blue-500 to-violet-500 relative after:absolute after:content-[''] after:top-2 after:-left-4 after:w-40 after:h-40 after:bg-white after:rounded-full after:bg-opacity-30 after:-z-10 before:absolute before:content-[''] before:bottom-2 before:-right-4 before:w-40 before:h-40 before:bg-white before:rounded-full before:bg-opacity-30 before:-z-10">
        <h3 className="text-xl font-bold text-white mb-2">رزرو نوبت</h3>
        <p className="text-white text-sm font-light mb-4">
          همین حالا نوبت خود را رزرو کنید و از خدمات ویژه ما بهره‌مند شوید.
        </p>
        <Link
          to="/reserve"
          className="py-2 px-4 inline-block rounded-xl bg-white text-blue-500 font-semibold hover:bg-slate-200 transition"
        >
          رزرو کن
        </Link>
      </div>

      {/* Packages */}
      <PackagesList />
    </section>
  );
};

export default HomePage;
