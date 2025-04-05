import React, { useState } from "react";
import { useEmployees, useRemoveEmployee } from "../../hooks/useBooking";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { GetEmployeesItem } from "../../types/types";
import { FaRegTrashAlt, FaUser } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router"; // Fixed import
import CustomModal from "../../components/CustomModal/CustomModal";
import { useQueryClient } from "@tanstack/react-query";

const ManageEmployees: React.FC = () => {
  const { data: employees, isPending, isError, error } = useEmployees();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const removeEmployeeMutation = useRemoveEmployee();
  const navigate = useNavigate();

  if (isPending) return <Loading />;

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.error(error);
    return (
      <div className="text-center p-6 text-red-500">
        خطا در بارگذاری اطلاعات!
      </div>
    );
  }

  const handleRemoveEmployee = (id: number) => {
    const removeEmpId = toast.loading("لطفا منتظر بمانید...");
    removeEmployeeMutation.mutate(id, {
      onSuccess: () => {
        toast.success("کارمند مورد نظر با موفقیت حذف شد", { id: removeEmpId });
        queryClient.invalidateQueries({ queryKey: ["employees"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف کارمند!", { id: removeEmpId });
        console.log(error);
      },
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <Link
          to="/add-employee"
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 transition rounded-xl py-2 px-4 flex items-center gap-2"
        >
          افزودن <IoPersonAdd />
        </Link>
        <button
          className="bg-orange-100 text-orange-500 hover:bg-orange-200 transition rounded-xl py-2 px-4 flex items-center gap-2"
          onClick={() => setIsUpdateOpen(true)}
        >
          بروزرسانی <RxUpdate />
        </button>
        <button
          className="bg-red-100 text-red-500 hover:bg-red-200 transition rounded-xl py-2 px-4 flex items-center gap-2"
          onClick={() => setIsDeleteOpen(true)}
        >
          حذف <FaTrashCan />
        </button>
      </div>

      {/* Delete employees modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف کارمند"
      >
        <div className="flex flex-col gap-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center gap-4 relative border-s-2 border-s-orange-500 rounded-xl border border-gray-200 p-2"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {emp.user.image ? (
                  <img src={emp.user.image} alt="Employee Image" />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal">
                  {emp.user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin">
                  {emp.skill}
                </span>
              </div>

              <button
                className="text-xl text-red-500 absolute top-7 left-4 hover:text-red-600 transition"
                onClick={() => handleRemoveEmployee(emp.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>
      {/* Update employees modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی کارمند"
      >
        <div className="flex flex-col gap-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center gap-4 relative border-s-2 border-s-orange-500 rounded-xl border border-gray-200 p-2"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {emp.user.image ? (
                  <img src={emp.user.image} alt="Employee Image" />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal">
                  {emp.user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin">
                  {emp.skill}
                </span>
              </div>

              <button
                className="text-xl text-blue-500 absolute top-7 left-4 hover:text-blue-600 transition"
                onClick={() => navigate(`/update-employee/${emp.id}`)}
              >
                <FaPencil />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <h3 className="text-gray-800 text-2xl font-bold ">کارمندان</h3>
      {employees?.length === 0 ? (
        <p className="text-gray-600">کارمندی یافت نشد.</p>
      ) : (
        employees?.map((employee: GetEmployeesItem) => {
          // Normalize image source, handle null explicitly
          const imageSrc = employee.user.image
            ? employee.user.image.startsWith("data:image")
              ? employee.user.image // Base64
              : employee.user.image.startsWith("https")
              ? employee.user.image // Full URL
              : `https://queuingprojectapi.pythonanywhere.com/${employee.user.image}` // Relative URL; adjust base URL
            : null;

          return (
            <div
              key={employee.id}
              className="bg-white shadow-sm rounded-lg p-6 mb-4 border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`${employee.user.first_name} ${employee.user.last_name}`}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      console.warn(
                        `Image failed for ${employee.user.first_name}: ${imageSrc}`
                      );
                      e.currentTarget.style.display = "none"; // Hide broken image
                      (e.currentTarget
                        .nextSibling as HTMLElement)!.style.display = "flex"; // Show fallback
                    }}
                  />
                ) : null}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500 ${
                    imageSrc ? "hidden" : ""
                  }`}
                >
                  <FaUser size={24} />
                </div>
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
                    <td className="py-2 text-end">
                      {employee.user.phone_number}
                    </td>
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
          );
        })
      )}
    </section>
  );
};

export default ManageEmployees;
