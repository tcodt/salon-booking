import React, { useMemo, useState } from "react";
import { MdAttachMoney, MdOutlineRoomService } from "react-icons/md";
import { PiTimerBold } from "react-icons/pi";
import Loading from "../../components/Loading/Loading";
import { FaPencil } from "react-icons/fa6";
import CustomModal from "../../components/CustomModal/CustomModal";
import { FaRegTrashAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useGetServices } from "../../hooks/services/useGetServices";
import { useRemoveService } from "../../hooks/services/useRemoveService";
import { useForm } from "react-hook-form";
import { PostServicesData } from "../../types/services";
import Button from "../../components/Button/Button";
import { useGetEmployees } from "../../hooks/employees/useGetEmployees";
import { useGetBusinesses } from "../../hooks/business/useGetBusinesses";
import { useAddService } from "../../hooks/services/useAddService";
import TimeInput from "../../components/TimeInput/TimeInput";
import { useUpdateService } from "../../hooks/services/useUpdateService";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";
import Dropdown from "../../components/Dropdown/Dropdown";
import { motion } from "framer-motion";
import {
  getEmployeeLabel,
  getEmployeeFirstName,
  getEmployeeImage,
  getEmployeeDisplayName,
} from "../../types/employees";
import { useBusinessMe } from "../../hooks/business/useBusinessMe";

const ManageServices: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostServicesData>();
  const { data: services, isError, isPending, error } = useGetServices();
  const { data: employees } = useGetEmployees();
  const { data: businesses } = useGetBusinesses();
  const { data: businessMe } = useBusinessMe();

  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [serviceToEdit, setServiceToEdit] = useState<PostServicesData | null>(
    null,
  );
  const [serviceIdToEdit, setServiceIdToEdit] = useState<number | null>(null);
  const [time, setTime] = useState({ hour: 0, minute: 0 });

  const queryClient = useQueryClient();
  const removeServiceMutation = useRemoveService();
  const addServiceMutation = useAddService();
  const updateServiceMutation = useUpdateService();
  const { themeColor } = useThemeColor();
  const myBusinessId = businessMe?.id;

  /** Only this owner's services (API may still return extras) */
  const ownerServices = useMemo(() => {
    if (!services) return [];
    if (!myBusinessId) return services;

    return services.filter((s) => {
      const b = s.business as unknown;
      if (b == null) return true; // trust API scoping
      if (typeof b === "number") return b === myBusinessId;
      if (typeof b === "object" && b !== null && "id" in b) {
        return (b as { id: number }).id === myBusinessId;
      }
      return true;
    });
  }, [services, myBusinessId]);

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.error(error);
    return (
      <div className="text-center p-6 text-red-500">
        خطا در بارگذاری اطلاعات!
      </div>
    );
  }

  if (isPending) return <Loading />;

  const onSubmit = (data: PostServicesData) => {
    if (!myBusinessId) {
      toast.error("کسب‌وکار شما یافت نشد");
      return;
    }

    const duration = `${String(time.hour).padStart(2, "0")}:${String(
      time.minute,
    ).padStart(2, "0")}:00`;

    const values: PostServicesData = {
      name: data.name,
      description: data.description ?? "",
      price: String(data.price),
      duration,
      business_id: myBusinessId,
      employee_id: Number(data.employee_id),
    };

    const toastId = toast.loading(
      serviceIdToEdit ? "در حال بروزرسانی سرویس..." : "در حال افزودن سرویس...",
    );

    if (serviceIdToEdit) {
      updateServiceMutation.mutate(
        { id: serviceIdToEdit, values },
        {
          onSuccess: () => {
            toast.success("سرویس با موفقیت بروزرسانی شد!", { id: toastId });
            reset();
            setIsAddOpen(false);
            setServiceToEdit(null);
            setServiceIdToEdit(null);
            setTime({ hour: 0, minute: 0 });
            queryClient.invalidateQueries({ queryKey: ["services"] });
          },
          onError: (error) => {
            toast.error("خطا در بروزرسانی سرویس", { id: toastId });
            console.error(error);
          },
        },
      );
      return;
    }

    addServiceMutation.mutate(values, {
      onSuccess: () => {
        toast.success("سرویس با موفقیت افزوده شد!", { id: toastId });
        reset();
        setIsAddOpen(false);
        setServiceToEdit(null);
        setServiceIdToEdit(null);
        setTime({ hour: 0, minute: 0 });
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
      onError: (error) => {
        const ax = error as AxiosError<{ detail?: string }>;
        toast.error(ax.response?.data?.detail || "خطا در افزودن سرویس", {
          id: toastId,
        });
        console.error(ax.response?.status, ax.response?.data);
      },
    });
  };

  const handleRemoveService = (id: number) => {
    const removeSerId = toast.loading("درحال حذف سرویس...");
    removeServiceMutation.mutate(id, {
      onSuccess: () => {
        toast.success("سرویس مورد نظر با موفقیت حذف شد", { id: removeSerId });
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف سرویس!", { id: removeSerId });
        const axiosError = error as AxiosError;
        console.log(axiosError);
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateService = (service: any) => {
    setServiceToEdit({
      name: service.name,
      price: service.price,
      description: service.description,
      duration: service.duration,
      business_id: service.business_id,
      employee_id: service.employee_id,
    });
    setServiceIdToEdit(service.id);
    const [hour, minute] = service.duration.split(":").map(Number);
    setTime({ hour, minute });
    setIsAddOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Delete services modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف سرویس"
      >
        <div className="flex flex-col gap-6">
          {services.map((ser) => (
            <div
              key={ser.id}
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {getEmployeeImage(ser?.employee?.user) ? (
                  <img
                    src={getEmployeeImage(ser?.employee?.user) || undefined}
                    alt="Service Image"
                  />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal dark:text-white">
                  {getEmployeeFirstName(ser?.employee?.user)}
                </h4>
                <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
                  {ser?.name}
                </span>
              </div>

              <button
                className="text-xl text-red-500 absolute top-7 left-4 hover:text-red-600 transition"
                onClick={() => handleRemoveService(ser.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>
      {/* Update services modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی سرویس"
      >
        <div className="flex flex-col gap-6">
          {services.map((ser) => (
            <div
              key={ser.id}
              className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md`}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {getEmployeeImage(ser?.employee?.user) ? (
                  <img
                    src={getEmployeeImage(ser?.employee?.user) || undefined}
                    alt="Service Image"
                  />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal dark:text-white">
                  {getEmployeeFirstName(ser?.employee?.user)}
                </h4>
                <span className="text-sm text-gray-500 font-thin dark:text-gray-300">
                  {ser?.name}
                </span>
              </div>

              <button
                className={`text-xl text-${themeColor}-500 absolute top-7 left-4 hover:text-${themeColor}-600 transition`}
                onClick={() => handleUpdateService(ser)}
              >
                <FaPencil />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      {/* Add services modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          reset();
          setTime({ hour: 0, minute: 0 });
        }}
        title="افزودن سرویس جدید"
      >
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="نام سرویس"
              defaultValue={serviceToEdit?.name || ""}
              {...register("name", { required: "نام سرویس الزامی است" })}
              className="primary-input"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="text"
              placeholder="توضیحات"
              defaultValue={serviceToEdit?.description || ""}
              {...register("description")}
              className="primary-input"
            />

            <TimeInput
              hour={time.hour}
              minute={time.minute}
              onChange={(h, m) => setTime({ hour: h, minute: m })}
            />

            <input
              type="number"
              placeholder="قیمت (مثلا: 200)"
              defaultValue={serviceToEdit?.price || ""}
              {...register("price", {
                required: "قیمت الزامی است",
                validate: (value) =>
                  !isNaN(Number(value)) || "قیمت باید عدد باشد",
              })}
              className="primary-input appearance-none"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}

            {businessMe && (
              <p className="text-sm text-gray-500">
                سالن:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {businessMe.name}
                </span>
              </p>
            )}

            <select
              {...register("business_id", {
                required: "کسب‌ و‌ کار الزامی است",
              })}
              className="primary-input"
              defaultValue={serviceToEdit?.business_id || ""}
            >
              <option value="" disabled>
                انتخاب کسب‌ و‌ کار
              </option>
              {businesses?.map((biz) => (
                <option key={biz.id} value={biz.id}>
                  {biz.name}
                </option>
              ))}
            </select>
            {errors.business_id && (
              <p className="text-red-500 text-sm">
                {errors.business_id.message}
              </p>
            )}

            <select
              className="primary-input"
              {...register("employee_id", {
                required: "کارمند الزامی است",
                valueAsNumber: true,
              })}
              defaultValue=""
            >
              <option value="" disabled>
                انتخاب کارمند
              </option>
              {employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {getEmployeeLabel(emp)}
                </option>
              ))}
            </select>
            {errors.employee_id && (
              <p className="text-red-500 text-sm">
                {errors.employee_id.message}
              </p>
            )}

            <Button variant="primary" type="submit">
              ثبت سرویس
            </Button>
          </form>
        </div>
      </CustomModal>

      <div className="flex flex-row justify-between items-center mt-8">
        <PageTitle title="خدمات" />
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

      {!ownerServices.length && (
        <div className="text-base text-gray-500">هیچ سرویسی وجود ندارد!</div>
      )}

      {ownerServices.map((service) => (
        <motion.div
          key={service.id}
          className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div
            className={`border-s-4 border-${themeColor}-500 bg-${themeColor}-100 p-1 text-xl font-semibold text-${themeColor}-800`}
          >
            <h4>{service.name}</h4>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            آرایشگر: {getEmployeeDisplayName(service.employee?.user)}
          </p>
          {/* duration / price as before */}
        </motion.div>
      ))}

      {services?.map((service) => (
        <motion.div
          className="p-4 rounded-xl bg-white shadow-md dark:bg-gray-700"
          key={service?.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`text-xl font-semibold text-${themeColor}-800 bg-${themeColor}-100 p-1 border-s-4 border-${themeColor}-500`}
          >
            <h4>
              {getEmployeeFirstName(service?.employee?.user)}{" "}
              {getEmployeeDisplayName(service?.employee?.user)}
            </h4>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1 dark:text-gray-200">
                <MdOutlineRoomService
                  size={24}
                  className={`text-${themeColor}-500`}
                />{" "}
                سرویس:
              </span>
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {service?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1 dark:text-gray-200">
                {" "}
                <PiTimerBold
                  size={24}
                  className={`text-${themeColor}-500`}
                />{" "}
                زمان:
              </span>
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {service?.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1 dark:text-gray-200">
                <MdAttachMoney size={24} className={`text-${themeColor}-500`} />{" "}
                هزینه:
              </span>
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {service?.price} هزار تومان
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ManageServices;
