/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaUser } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
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
import Dropdown from "../../components/Dropdown/Dropdown";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { motion } from "framer-motion";
import {
  GetEmployeesItem,
  getEmployeeDisplayName,
  getEmployeeFirstName,
  getEmployeePhone,
  getEmployeeIsActive,
  getEmployeeIsOwner,
  getEmployeeIsStaff,
  getEmployeeUserId,
  getEmployeeImage,
} from "../../types/employees";
import { useAuth } from "../../context/AuthContext";

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
    null,
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
  const { user } = useAuth();
  const currentUserId = user?.id;

  const isSelf = (emp: GetEmployeesItem) => {
    const empUserId = getEmployeeUserId(emp.user);
    return (
      empUserId != null && currentUserId != null && empUserId === currentUserId
    );
  };

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
    toast.success("خوبه! حالا مهارت آرایشگر را وارد کنید");
  };

  const handleAddEmployee = () => {
    if (!selectedUserId || !skill) return;
    const toastId = toast.loading("در حال افزودن آرایشگر...");

    addEmployeeMutation.mutate(
      { user_id: selectedUserId, skill },
      {
        onSuccess: () => {
          toast.success("آرایشگر با موفقیت اضافه شد!", { id: toastId });
          setIsAddOpen(false);
          setSelectedUser("");
          setSelectedUserId(null);
          setSkill("");
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "خطا در افزودن آرایشگر!";
          toast.error("خطا در افزودن آرایشگر!", { id: toastId });
          console.error(error);
          console.error(errorMessage);
        },
      },
    );
  };

  const handleUpdateEmp = (
    id: number,
    skill: string,
    firstName: string,
    userId: number,
  ) => {
    setUpdatingEmployeeId(id);
    setSelectedUserIdUpdate(userId);
    setSkillUpdate(skill);
    setSelectedUserUpdate(firstName);
    toast.success("خوبه! حالا مهارت آرایشگر را بروزرسانی کنید");
  };

  const handleUpdateEmployee = () => {
    if (!updatingEmployeeId || !selectedUserIdUpdate || !skillUpdate) return;
    const toastId = toast.loading("در حال بروزرسانی آرایشگر...");

    updateEmployeeMutation.mutate(
      {
        id: updatingEmployeeId,
        user_id: selectedUserIdUpdate,
        skill: skillUpdate,
      },
      {
        onSuccess: () => {
          toast.success("آرایشگر با موفقیت بروزرسانی شد!", { id: toastId });
          setIsUpdateOpen(false);
          setSelectedUserUpdate("");
          setSelectedUserIdUpdate(null);
          setSkillUpdate("");
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: (error) => {
          toast.error("خطا در بروزرسانی آرایشگر!", { id: toastId });
          console.error(error);
        },
      },
    );
  };

  const handleRemoveEmployee = (emp: GetEmployeesItem) => {
    if (isSelf(emp)) {
      toast.error("نمی‌توانید خودتان را از لیست آرایشگران حذف کنید");
      return;
    }

    const removeEmpId = toast.loading("لطفا منتظر بمانید...");
    removeEmployeeMutation.mutate(emp.id, {
      onSuccess: () => {
        toast.success("آرایشگر مورد نظر با موفقیت حذف شد", { id: removeEmpId });
        queryClient.invalidateQueries({ queryKey: ["employees"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف آرایشگر!", { id: removeEmpId });
        console.log(error);
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Delete employees modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف آرایشگر"
      >
        <div className="flex flex-col gap-6">
          {employees
            .filter((emp) => !isSelf(emp))
            .map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                actionIcon={<FaRegTrashAlt />}
                onAction={() => handleRemoveEmployee(emp)}
                themeColor={themeColor}
              />
            ))}
        </div>
      </CustomModal>

      {/* Update employees modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی آرایشگران"
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="آرایشگر انتخاب شده..."
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
            بروزرسانی آرایشگران
          </Button>
          <div className="flex flex-col gap-6">
            {employees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                actionIcon={<FaPencil />}
                onAction={() =>
                  handleUpdateEmp(
                    emp.id,
                    emp.skill,
                    getEmployeeFirstName(emp.user),
                    getEmployeeUserId(emp.user) ?? 0,
                  )
                }
                themeColor={themeColor}
              />
            ))}
          </div>
        </div>
      </CustomModal>

      {/* Add employees modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن آرایشگر"
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="آرایشگر را اضافه کنید"
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
            ثبت آرایشگر
          </Button>
          {users
            .filter((u) => u.id !== currentUserId)
            .map((user) => (
              <EmployeeCard
                key={user.id}
                employee={{
                  id: user.id,
                  user: user, // full User object
                }}
                actionIcon={<IoAdd />}
                onAction={() => handleAddUser(user.id, user.first_name)}
                themeColor={themeColor}
              />
            ))}
        </div>
      </CustomModal>

      <div className="flex items-center justify-between mt-8">
        <PageTitle title="آرایشگران" />
        {/* Edit Box */}
        <div className="flex flex-row flex-wrap items-center gap-2">
          <Dropdown
            isAddOpen={isAddOpen}
            setIsAddOpen={setIsAddOpen}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
          />
        </div>
      </div>
      {!employees?.length ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-14 text-center dark:border-gray-600 dark:bg-gray-800">
          <div
            className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-${themeColor}-50 text-${themeColor}-600 dark:bg-${themeColor}-900/30`}
          >
            <FaUser size={22} />
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">
            هنوز آرایشگری ثبت نشده
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            از منوی بالا، آرایشگر جدید اضافه کنید.
          </p>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className={`mt-4 rounded-xl bg-${themeColor}-600 px-4 py-2.5 text-sm font-semibold text-white`}
          >
            افزودن آرایشگر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {employees.map((employee) => {
            const name = getEmployeeDisplayName(employee.user);
            const phone = getEmployeePhone(employee.user);
            const active = getEmployeeIsActive(employee.user);
            const owner = getEmployeeIsOwner(employee.user);
            const staff = getEmployeeIsStaff(employee.user);
            const self = isSelf(employee);
            const skill = employee.skill?.trim() || "بدون مهارت ثبت‌شده";
            const image = getEmployeeImage(employee.user);

            const roleLabel = owner ? "مالک" : staff ? "آرایشگر" : "کاربر";

            return (
              <motion.article
                key={employee.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-${themeColor}-400 to-${themeColor}-600`}
                />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-${themeColor}-50 text-${themeColor}-600 ring-1 ring-${themeColor}-100 dark:bg-${themeColor}-900/30 dark:ring-${themeColor}-800`}
                  >
                    {image ? (
                      <img
                        src={
                          image.startsWith("http")
                            ? image
                            : `https://queuingprojectapi.pythonanywhere.com${image}`
                        }
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUser size={22} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-bold text-gray-900 dark:text-white">
                          {name}
                          {self && (
                            <span className="mr-1 text-xs font-medium text-gray-400">
                              (شما)
                            </span>
                          )}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          {skill}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          active
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                        }`}
                      >
                        {active ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full bg-${themeColor}-50 px-2.5 py-0.5 text-[11px] font-semibold text-${themeColor}-700 dark:bg-${themeColor}-900/40 dark:text-${themeColor}-300`}
                      >
                        {roleLabel}
                      </span>
                      <span
                        className="rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        dir="ltr"
                      >
                        {phone}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-gray-50 pt-3 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUpdateOpen(true);
                          handleUpdateEmp(
                            employee.id,
                            employee.skill,
                            getEmployeeFirstName(employee.user),
                            getEmployeeUserId(employee.user) ?? 0,
                          );
                        }}
                        className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-${themeColor}-50 py-2 text-xs font-semibold text-${themeColor}-700 transition hover:bg-${themeColor}-100 dark:bg-${themeColor}-900/30 dark:text-${themeColor}-300`}
                      >
                        <FaPencil size={12} />
                        ویرایش
                      </button>
                      {!self && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEmployee(employee)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300"
                        >
                          <FaRegTrashAlt size={12} />
                          حذف
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ManageEmployees;
