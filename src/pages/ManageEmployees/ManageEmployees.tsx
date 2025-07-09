import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { GetEmployeesItem } from "../../types/employees";
import { FaRegTrashAlt, FaUser } from "react-icons/fa";
import { IoAdd, IoPersonAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEmployees } from "../../hooks/employees/useGetEmployees";
import { useRemoveEmployee } from "../../hooks/employees/useRemoveEmployee";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import Button from "../../components/Button/Button";
import { useAddEmployee } from "../../hooks/employees/useAddEmployee";
import { useUpdateEmployee } from "../../hooks/employees/useUpdateEmployee";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";
import OptionsBox from "../../components/OptionsBox/OptionsBox";
import { useAcl } from "../../context/AclContext";

const ManageEmployees: React.FC = () => {
  const {
    data: employees,
    isPending: isEmployeesPending,
    isError: isEmployeesError,
    error: employeesError,
  } = useGetEmployees();

  const {
    data: users,
    isPending: isUsersPending,
    isError: isUsersError,
    error: usersError,
  } = useGetUsers();

  const addEmployeeMutation = useAddEmployee();
  const updateEmployeeMutation = useUpdateEmployee();

  const isPending = isEmployeesPending || isUsersPending;
  const isError = isEmployeesError || isUsersError;
  const error = employeesError || usersError;

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [skill, setSkill] = useState<string>("");
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState<number | null>(
    null
  );
  const [selectedUserUpdate, setSelectedUserUpdate] = useState<string>("");
  const [selectedUserIdUpdate, setSelectedUserIdUpdate] = useState<
    number | null
  >(null);
  const [skillUpdate, setSkillUpdate] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const removeEmployeeMutation = useRemoveEmployee();
  const { themeColor } = useThemeColor();
  const { hasPermission, userPermissions } = useAcl();

  console.log("User permissions: ", userPermissions);

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

  const handleAddUser = (id: number, firstName: string) => {
    setSelectedUser(firstName);
    setSelectedUserId(id);
    toast.success("خوبه! حالا مهارت کارمند را وارد کنید");
  };

  const handleAddEmployee = () => {
    if (!selectedUserId || !skill) return;
    const toastId = toast.loading("در حال افزودن کارمند...");

    addEmployeeMutation.mutate(
      { user_id: selectedUserId, skill },
      {
        onSuccess: () => {
          toast.success("کارمند با موفقیت اضافه شد!", { id: toastId });
          setIsAddOpen(false);
          setSelectedUser("");
          setSelectedUserId(null);
          setSkill("");
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: (error) => {
          toast.error("خطا در افزودن کارمند!", { id: toastId });
          console.error(error);
        },
      }
    );
  };

  const handleUpdateEmp = (
    id: number,
    skill: string,
    firstName: string,
    userId: number
  ) => {
    setUpdatingEmployeeId(id);
    setSelectedUserIdUpdate(userId);
    setSkillUpdate(skill);
    setSelectedUserUpdate(firstName);
    toast.success("خوبه! حالا مهارت کارمند را بروزرسانی کنید");
  };

  const handleUpdateEmployee = () => {
    if (!updatingEmployeeId || !selectedUserIdUpdate || !skillUpdate) return;
    const toastId = toast.loading("در حال بروزرسانی کارمند...");

    updateEmployeeMutation.mutate(
      {
        id: updatingEmployeeId,
        user_id: selectedUserIdUpdate,
        skill: skillUpdate,
      },
      {
        onSuccess: () => {
          toast.success("کارمند با موفقیت بروزرسانی شد!", { id: toastId });
          setIsUpdateOpen(false);
          setSelectedUserUpdate("");
          setSelectedUserIdUpdate(null);
          setSkillUpdate("");
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: (error) => {
          toast.error("خطا در بروزرسانی کارمند!", { id: toastId });
          console.error(error);
        },
      }
    );
  };

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
        <OptionsBox
          color="sky"
          onClick={() => setIsAddOpen(true)}
          icon={<IoPersonAdd />}
          title="افزودن"
        />
        <OptionsBox
          color="green"
          onClick={() => setIsUpdateOpen(true)}
          icon={<RxUpdate />}
          title="بروزرسانی"
        />
        <OptionsBox
          color="red"
          onClick={() => setIsDeleteOpen(true)}
          icon={<FaTrashCan />}
          title="حذف"
        />
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
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-e-xl bg-slate-100 dark:bg-gray-700 shadow-md p-2"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {emp.user.image ? (
                  <img src={emp.user.image} alt="Employee Image" />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal dark:text-white">
                  {emp.user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
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
          <input
            type="text"
            placeholder="کارمند انتخاب شده..."
            value={selectedUserUpdate}
            readOnly
            className={`py-2 px-4 h-11 bg-slate-100 rounded-xl outline-none border-2 border-gray-300 focus:border-${themeColor}-500 text-gray-700 text-base transition dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:focus:border-${themeColor}-500`}
          />
          <textarea
            rows={2}
            className={`p-4 bg-slate-100 rounded-xl outline-none border-2 border-gray-300 focus:border-${themeColor}-500 text-gray-700 text-base transition dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:focus:border-${themeColor}-500`}
            placeholder="مهارت ها..."
            defaultValue={skillUpdate}
            onChange={(e) => setSkillUpdate(e.target.value)}
          ></textarea>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            بروزرسانی کارمند
          </Button>
          <div className="flex flex-col gap-6">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md`}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                  {emp.user.image ? (
                    <img src={emp.user.image} alt="Employee Image" />
                  ) : (
                    <FaUser size={20} />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base text-gray-800 font-normal dark:text-white">
                    {emp.user.first_name}
                  </h4>
                  <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
                    {emp.skill}
                  </span>
                </div>

                <button
                  className={`text-xl text-${themeColor}-500 absolute top-7 left-4 hover:text-${themeColor}-600 transition`}
                  onClick={() =>
                    handleUpdateEmp(
                      emp.id,
                      emp.skill,
                      emp.user.first_name,
                      emp.user.id
                    )
                  }
                >
                  <FaPencil />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CustomModal>

      {/* Add employees modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن کارمند"
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="کاربر را اضافه کنید"
            value={selectedUser}
            readOnly
            className={`py-2 px-4 h-11 bg-slate-100 rounded-xl outline-none border-2 border-gray-300 focus:border-${themeColor}-500 text-gray-700 text-base transition dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:focus:border-${themeColor}-500`}
          />
          <textarea
            rows={2}
            className={`p-4 bg-slate-100 rounded-xl outline-none border-2 border-gray-300 focus:border-${themeColor}-500 text-gray-700 text-base transition dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:focus:border-${themeColor}-500`}
            placeholder="مهارت ها..."
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          ></textarea>
          <Button variant="primary" onClick={handleAddEmployee}>
            ثبت کارمند
          </Button>
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl bg-slate-100 dark:bg-gray-700 shadow-md p-2`}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Employee Image"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal dark:text-white">
                  {user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
                  {user.phone_number}
                </span>
              </div>

              <button
                className={`text-xl text-${themeColor}-500 absolute top-6 left-4 bg-${themeColor}-100 p-1 rounded-full hover:text-${themeColor}-600 transition`}
                onClick={() => handleAddUser(user.id, user.first_name)}
              >
                <IoAdd />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <PageTitle title="کارمندان" />
      {employees?.length === 0 ? (
        <p className="text-gray-600">کارمندی یافت نشد.</p>
      ) : (
        hasPermission("employee_list") &&
        employees?.map((employee: GetEmployeesItem) => {
          return (
            <div
              key={employee.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                  <FaUser size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {employee.user.first_name} {employee.user.last_name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {employee.skill}
                  </p>
                </div>
              </div>

              <table className="table-auto w-full text-sm text-gray-600 dark:text-gray-300">
                <tbody>
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
                            ? "bg-green-100 text-green-500 dark:bg-green-500 dark:text-white"
                            : "bg-red-100 text-red-500 dark:bg-red-500 dark:text-white"
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
