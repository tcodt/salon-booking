import React from "react";
import { FaUser } from "react-icons/fa";
import {
  EmployeeUser,
  getEmployeeDisplayName,
  getEmployeeImage,
} from "../../types/employees";

interface EmployeeCardProps {
  employee: {
    id: number;
    user: EmployeeUser;
    skill?: string;
  };
  actionIcon: React.ReactNode;
  onAction: () => void;
  themeColor: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  actionIcon,
  onAction,
  themeColor,
}) => {
  const name = getEmployeeDisplayName(employee.user);
  const image = getEmployeeImage(employee.user);
  const skill = employee.skill?.trim();

  return (
    <div
      className={`relative flex items-center gap-4 rounded-e-xl border-s-2 border-s-${themeColor}-500 bg-slate-100 p-2 shadow-md dark:bg-gray-700`}
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100 text-gray-500">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <FaUser size={20} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-base font-medium text-gray-800 dark:text-white">
          {name}
        </h4>
        {skill ? (
          <span className="block truncate text-sm text-gray-500 dark:text-gray-300">
            {skill}
          </span>
        ) : (
          <span className="block text-sm text-gray-400">
            بدون مهارت ثبت‌شده
          </span>
        )}
      </div>

      <button
        type="button"
        className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-${themeColor}-100 p-1.5 text-lg text-${themeColor}-500 transition hover:text-${themeColor}-600`}
        onClick={onAction}
        aria-label="عملیات"
      >
        {actionIcon}
      </button>
    </div>
  );
};

export default EmployeeCard;
