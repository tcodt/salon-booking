import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useThemeColor } from "../../context/ThemeColor";
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { Link } from "react-router";
import { useGetUsers } from "../../hooks/users/useGetUsers";

const Dashboard: React.FC = () => {
  const { data: userProfile } = useGetProfile();
  const { themeColor } = useThemeColor();
  const { data: allUsers } = useGetUsers();

  return (
    <section className="space-y-4">
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

      <div className="flex items-start gap-4">
        <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-700">
          <div className="flex items-center gap-2">
            <FaUser className={`text-xl text-${themeColor}-500`} />
            <p className="text-gray-700 text-base font-medium dark:text-gray-200">
              {allUsers?.length} کاربر
            </p>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-xl dark:bg-gray-700 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 text-base font-medium dark:text-gray-200">
              کاربران
            </p>
            <FaUsers className={`text-xl text-${themeColor}-500`} />
          </div>

          <div className="space-y-4 mt-4">
            {allUsers?.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full border-2 border-${themeColor}-500 flex items-center justify-center overflow-hidden`}
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="User Image"
                      className="rounded-full object-cover w-10 h-10"
                    />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
