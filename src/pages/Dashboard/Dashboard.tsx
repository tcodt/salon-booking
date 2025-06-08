import React from "react";
import { FaUser } from "react-icons/fa";
import { useThemeColor } from "../../context/ThemeColor";
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { Link } from "react-router";

const Dashboard: React.FC = () => {
  const { data: userProfile } = useGetProfile();
  const { themeColor } = useThemeColor();

  return (
    <section>
      <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-full border-2 border-${themeColor}-500 flex items-center justify-center overflow-hidden`}
          >
            {userProfile?.image ? (
              <Link to="/user-profile">
                <img
                  src={userProfile.image}
                  alt="Profile Image"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </Link>
            ) : (
              <FaUser className="text-gray-500" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              {userProfile?.first_name} {userProfile?.last_name}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {userProfile?.phone_number}
            </span>
          </div>
          <span>
            {userProfile?.is_owner ? (
              <span
                className={`overflow-hidden bg-${themeColor}-500 px-2 py-3 rounded-full animate-pulse duration-1000 text-white text-sm`}
              >
                مالک
              </span>
            ) : userProfile?.is_staff ? (
              <span
                className={`overflow-hidden bg-${themeColor}-500 px-2 py-3 rounded-full animate-pulse duration-1000 text-white text-sm`}
              >
                کارمند
              </span>
            ) : userProfile?.is_superuser ? (
              <span
                className={`overflow-hidden bg-${themeColor}-500 px-2 py-3 rounded-full animate-pulse duration-1000 text-white text-sm`}
              >
                مدیر
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
