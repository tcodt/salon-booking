import React from "react";
import { useEmployees } from "../../hooks/useBooking";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { GetEmployeesItem } from "../../types/types";
import { FaUser } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router";

const ManageEmployees: React.FC = () => {
  const { data: employees, isPending, isError, error } = useEmployees();

  if (isPending) return <Loading />;

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.error(error);
  }

  return (
    <section className="p-4">
      <div className="flex items-center gap-2">
        <Link
          to="/add-employee"
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 transition rounded-xl py-2 px-4 mb-4 flex items-center gap-2"
        >
          افزودن <IoPersonAdd />
        </Link>
        <button className="bg-orange-100 text-orange-500 hover:bg-orange-200 transition rounded-xl py-2 px-4 mb-4 flex items-center gap-2">
          بروزرسانی <RxUpdate />
        </button>
        <button className="bg-red-100 text-red-500 hover:bg-red-200 transition rounded-xl py-2 px-4 mb-4 flex items-center gap-2">
          حذف <FaTrashCan />
        </button>
      </div>

      <h3 className="text-gray-800 text-2xl font-bold my-4">کارمندان</h3>
      {employees?.map((employee: GetEmployeesItem) => (
        <div
          key={employee.id}
          className="bg-white shadow-sm rounded-lg p-6 mb-4 border border-gray-200"
        >
          <div className="flex items-center gap-4 mb-4">
            {employee.user.image ? (
              <img
                src={employee.user.image}
                alt={`${employee.user.first_name} ${employee.user.last_name}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="border-2 p-4 rounded-full text-xl text-gray-500">
                <FaUser />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {employee.user.first_name} {employee.user.last_name}
              </h2>
              <p className="text-gray-600">{employee.skill}</p>
            </div>
          </div>

          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="font-medium py-2 w-1/4">ایمیل:</td>
                <td className="py-2 text-end">{employee.user.email}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">شماره تلفن:</td>
                <td className="py-2 text-end">{employee.user.phone_number}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">وضعیت:</td>
                <td className="py-2 text-end">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      employee.user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.user.is_active ? "فعال" : "غیرفعال"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-medium py-2">نقش:</td>
                <td className="py-2 text-end">
                  {employee.user.is_owner
                    ? "مالک"
                    : employee.user.is_staff
                    ? "کارمند"
                    : "کاربر"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
};

export default ManageEmployees;
