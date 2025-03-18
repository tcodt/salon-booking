import React from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useUserProfile } from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { FaUser } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const { data: user, isPending, isError } = useUserProfile();

  if (isPending) return <Loading />;

  if (isError) return <p className="text-red-500">خطا در بارگذاری اطلاعات</p>;

  return (
    <section className="p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <ThemeToggle />
        </div>
        <div className="p-2 bg-white shadow-md border border-orange-500 rounded-full">
          {user?.image ? (
            <img
              src={user.image}
              alt="User Image"
              className="w-10 h-10 object-contain"
            />
          ) : (
            <FaUser className="w-10 h-10 text-gray-500" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
