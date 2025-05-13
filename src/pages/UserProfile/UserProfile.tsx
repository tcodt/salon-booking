import React from "react";
import { useUserProfile } from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const { data: userProfile } = useUserProfile();

  return (
    <section>
      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 border-2 border-orange-700">
        <div className="flex items-start justify-between">
          <ul className="space-y-4 list-disc marker:text-orange-700 ms-4">
            <li className="text-white font-medium">
              نام: <span>{userProfile?.first_name}</span>
            </li>
            <li className="text-white font-medium">
              خانوادگی: <span>{userProfile?.last_name}</span>
            </li>
            <li className="text-white font-medium">
              نقش: <span>{userProfile?.is_owner ? "ادمین" : "کاربر"}</span>
            </li>
          </ul>
          <div className="border-2 border-orange-700 p-4 rounded-full bg-orange-50">
            <FaUser className="text-gray-500 text-4xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
