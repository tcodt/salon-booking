import React, { useState } from "react";
import { MdAttachMoney, MdOutlineRoomService } from "react-icons/md";
import { PiTimerBold } from "react-icons/pi";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router";
import { IoPersonAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
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
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [duration, setDuration] = useState("00:00:00");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const removeServiceMutation = useRemoveService();
  const addServiceMutation = useAddService();

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
    const finalData: PostServicesData = {
      ...data,
      duration: duration,
    };

    const toastId = toast.loading("در حال افزودن سرویس...");
    addServiceMutation.mutate(finalData, {
      onSuccess: () => {
        toast.success("سرویس با موفقیت افزوده شد!", { id: toastId });
        reset();
        setDuration("00:00:00");
        setIsAddOpen(false);
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        toast.error("خطایی رخ داده است!", { id: toastId });
        console.error(axiosError);
      },
    });
  };

  const handleRemoveService = (id: number) => {
    const removeSerId = toast.loading("لطفا منتظر بمانید...");
    removeServiceMutation.mutate(id, {
      onSuccess: () => {
        toast.success("سرویس مورد نظر با موفقیت حذف شد", { id: removeSerId });
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        console.log(error);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <button
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          افزودن <IoPersonAdd />
        </button>
        <button
          className="bg-orange-100 text-orange-500 hover:bg-orange-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => setIsUpdateOpen(true)}
        >
          بروزرسانی <RxUpdate />
        </button>
        <button
          className="bg-red-100 text-red-500 hover:bg-red-200 transition rounded-xl py-1 px-3 flex items-center gap-2"
          onClick={() => setIsDeleteOpen(true)}
        >
          حذف <FaTrashCan />
        </button>
      </div>

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
              className="flex items-center gap-4 relative border-s-2 border-s-orange-500 rounded-xl border border-gray-200 p-2"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {ser?.employee?.user.image ? (
                  <img src={ser?.employee?.user.image} alt="Service Image" />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal">
                  {ser?.employee?.user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin">
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
              className="flex items-center gap-4 relative border-s-2 border-s-orange-500 rounded-xl border border-gray-200 p-2"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-500">
                {ser?.employee?.user.image ? (
                  <img src={ser?.employee?.user.image} alt="Service Image" />
                ) : (
                  <FaUser size={20} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-gray-800 font-normal">
                  {ser?.employee?.user.first_name}
                </h4>
                <span className="text-sm text-gray-500 font-thin">
                  {ser?.name}
                </span>
              </div>

              <button
                className="text-xl text-blue-500 absolute top-7 left-4 hover:text-blue-600 transition"
                onClick={() => navigate(`/update-service/${ser.id}`)}
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
          setDuration("00:00:00");
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
              {...register("name", { required: "نام سرویس الزامی است" })}
              className="primary-input"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="text"
              placeholder="توضیحات"
              {...register("description")}
              className="primary-input"
            />

            <TimeInput value={duration} onChange={setDuration} />

            {/* <input
              type="text"
              placeholder="مدت زمان"
              {...register("duration", { required: "مدت زمان الزامی است" })}
              className="primary-input"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )} */}

            <input
              type="text"
              placeholder="قیمت (مثلا: 200)"
              {...register("price", {
                required: "قیمت الزامی است",
                validate: (value) =>
                  !isNaN(Number(value)) || "قیمت باید عدد باشد",
              })}
              className="primary-input"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}

            <select
              {...register("business_id", {
                required: "کسب‌ و‌ کار الزامی است",
              })}
              className="primary-input"
              defaultValue=""
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
              {...register("employee_id", { required: "کارمند الزامی است" })}
              className="primary-input"
              defaultValue=""
            >
              <option value="" disabled>
                انتخاب کارمند
              </option>
              {employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.user.first_name} {emp.user.last_name}
                </option>
              ))}
            </select>
            {errors.employee_id && (
              <p className="text-red-500 text-sm">
                {errors.employee_id.message}
              </p>
            )}

            <Button type="submit">ثبت سرویس</Button>
          </form>
        </div>
      </CustomModal>

      <h3 className="text-gray-800 text-2xl font-bold ">سرویس ها</h3>

      {services?.map((service) => (
        <div
          className="p-4 border rounded-xl shadow-sm bg-white"
          key={service?.id}
        >
          <div className="text-xl font-semibold text-gray-800 bg-orange-100 p-1 border-s-4 border-orange-500">
            <h4>
              {service?.employee?.user.first_name}{" "}
              {service?.employee?.user.last_name}
            </h4>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1">
                <MdOutlineRoomService size={24} color="orange" /> سرویس:
              </span>
              <span className="text-base font-normal text-gray-500">
                {service?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1">
                {" "}
                <PiTimerBold size={24} color="orange" /> زمان:
              </span>
              <span className="text-base font-normal text-gray-500">
                {service?.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-normal text-gray-700 flex items-center gap-1">
                <MdAttachMoney size={24} color="orange" /> هزینه:
              </span>
              <span className="text-base font-normal text-gray-500">
                {service?.price} هزار تومان
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
