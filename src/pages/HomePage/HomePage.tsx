import React from "react";
import { useUserProfile } from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { IoNotificationsOutline } from "react-icons/io5";
import { getGreeting } from "../../utils/greetings";
import { CiSearch } from "react-icons/ci";

const HomePage: React.FC = () => {
  const { data: user, isPending, isError } = useUserProfile();

  const greetingUser = getGreeting(user?.first_name);

  if (isPending) return <Loading />;

  if (isError) return <p className="text-red-500">خطا در بارگذاری اطلاعات</p>;

  return (
    <section className="p-4 h-screen w-screen overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <IoNotificationsOutline size={30} color="gray" />
        </div>
        <div className="p-2 bg-white shadow-md border border-orange-500 rounded-full">
          <img
            src="/logo.png"
            alt="Home Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* User Name */}
      <h3 className="text-2xl font-bold text-gray-800 my-3">{greetingUser}</h3>

      {/* Search Bar */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="جستجو"
          className="py-2 px-4 h-11 bg-slate-100 w-full rounded-xl border focus:border-orange-500 transition outline-none"
        />
        <CiSearch size={25} className="absolute top-2 left-2 text-gray-500" />
      </div>

      {/* Box */}
      <div className="bg-orange-400 p-4 rounded-xl z-10 flex flex-col gap-2 relative after:absolute after:content-[''] after:top-2 after:-left-4 after:w-40 after:h-40 after:bg-white after:rounded-full after:bg-opacity-30 after:-z-10">
        <span className="text-white text-sm font-light">تخفیف ویژه</span>
        <h4 className="text-white font-semibold text-xl">برای امروز</h4>
        <p className="text-white text-sm font-light">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است.
        </p>
        <span className="absolute top-6 left-6 text-2xl font-bold text-white">
          30%
        </span>
      </div>
    </section>
  );
};

export default HomePage;
