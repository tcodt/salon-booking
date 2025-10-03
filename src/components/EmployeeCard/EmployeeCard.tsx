import { FaUser } from "react-icons/fa";

interface EmployeeCardProps {
  employee: {
    id: number;
    user: { first_name: string; last_name: string; image?: string };
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
}) => (
  <div
    className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl bg-slate-100 dark:bg-gray-700 shadow-md p-2`}
  >
    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
      {employee.user.image ? (
        <img
          src={employee.user.image}
          alt="Employee Image"
          className="object-cover rounded-full w-full h-full"
        />
      ) : (
        <FaUser size={20} />
      )}
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="text-base text-gray-800 font-normal dark:text-white">
        {employee.user.first_name} {employee.user.last_name}
      </h4>
      {employee.skill && (
        <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
          {employee.skill}
        </span>
      )}
    </div>
    <button
      className={`text-xl bg-${themeColor}-100 rounded-full p-1 text-${themeColor}-500 absolute top-6 left-4 hover:text-${themeColor}-600 transition`}
      onClick={onAction}
    >
      {actionIcon}
    </button>
  </div>
);

export default EmployeeCard;
