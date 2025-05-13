import React, { useState, useEffect } from "react";
import OptionsBox from "../../components/OptionsBox/OptionsBox";
import { IoCamera, IoPersonAdd } from "react-icons/io5";
import CustomModal from "../../components/CustomModal/CustomModal";
import Button from "../../components/Button/Button";
import { useGetPackages } from "../../hooks/packages/useGetPackages";
import { useGetServices } from "../../hooks/services/useGetServices";
import { useAddPackage } from "../../hooks/packages/useAddPackage";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddPackage } from "../../types/packages";
import { Link } from "react-router";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRemovePackage } from "../../hooks/packages/useRemovePackage";

const Packages: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddPackage>({
    defaultValues: {
      business_id: 3,
      name: "",
      desc: "",
      total_price: "",
      service_ids: [],
    },
  });

  const { data: packages, isPending, isError, error } = useGetPackages();
  const { data: servicesData = [] } = useGetServices();
  const addPackageMutation = useAddPackage();
  const removePackageMutation = useRemovePackage();
  const queryClient = useQueryClient();

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

  const selectedServiceIds = watch("service_ids");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        toast.error("حجم فایل بیش از حد مجاز است");
        return;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("فرمت فایل مجاز نیست");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddPackage = (data: AddPackage) => {
    if (!image) {
      toast.error("لطفا یک عکس انتخاب کنید");
      return;
    }

    if (data.service_ids.length === 0) {
      toast.error("لطفا حداقل یک سرویس انتخاب کنید");
      return;
    }

    const toastId = toast.loading("درحال افزودن پکیج");

    const formData = new FormData();
    formData.append("business_id", String(data.business_id));
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("total_price", data.total_price);
    formData.append("image", image);

    // ✅ Key fix: use JSON string for service_ids
    data.service_ids.map(Number).forEach((id) => {
      formData.append("service_ids", id.toString());
    });

    addPackageMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("پکیج با موفقیت اضافه شد", { id: toastId });
        queryClient.invalidateQueries({ queryKey: ["packages"] });
        reset();
        setImage(null);
        setPreview(null);
        setIsAddOpen(false);
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.error("Add Package Error:", axiosError);
        toast.error("خطا در افزودن پکیج!", { id: toastId });
      },
    });
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (isPending) return <Loading />;
  if (isError) {
    console.error(error);
    toast.error("خطا در دریافت پکیج‌ها");
    return (
      <div className="text-center p-6 text-red-500">خطا در دریافت پکیج‌ها</div>
    );
  }

  const handleRemovePackage = (id: number) => {
    const removePkgId = toast.loading("درحال حذف پکیج...");
    removePackageMutation.mutate(id, {
      onSuccess: () => {
        toast.success("پکیج مورد نظر با موفقیت حذف شد", { id: removePkgId });
        queryClient.invalidateQueries({ queryKey: ["packages"] });
      },
      onError: (error) => {
        toast.error("خطا در حذف پکیج!", { id: removePkgId });
        const axiosError = error as AxiosError;
        console.log(axiosError);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <OptionsBox
          onClick={() => setIsAddOpen(true)}
          title="افزودن"
          color="sky"
          icon={<IoPersonAdd />}
        />
        <OptionsBox
          onClick={() => setIsUpdateOpen(true)}
          title="بروزرسانی"
          color="green"
          icon={<FaTrashCan />}
        />
        <OptionsBox
          onClick={() => setIsDeleteOpen(true)}
          title="حذف"
          color="red"
          icon={<FaTrashCan />}
        />
      </div>

      <h3 className="primary-title">پکیج‌ها</h3>

      {!packages?.length && (
        <div className="text-center p-6 text-gray-500">هیچ پکیجی یافت نشد!</div>
      )}

      {/* Add Package Modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن پکیج"
      >
        <form
          onSubmit={handleSubmit(handleAddPackage)}
          className="flex flex-col gap-6"
        >
          <div>
            <input
              type="text"
              className="primary-input"
              placeholder="نام پکیج"
              {...register("name", { required: "نام پکیج الزامی است" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <textarea
              className="primary-input"
              placeholder="توضیحات"
              {...register("desc", { required: "توضیحات الزامی است" })}
            ></textarea>
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              className="primary-input"
              placeholder="قیمت"
              {...register("total_price", {
                required: "قیمت الزامی است",
                pattern: {
                  value: /^-?\d*\.?\d+$/,
                  message: "لطفا یک عدد معتبر وارد کنید",
                },
              })}
            />
            {errors.total_price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              سرویس‌ها
            </label>
            {servicesData.length === 0 ? (
              <p className="text-red-500 text-sm">هیچ سرویسی در دسترس نیست</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {servicesData.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      {...register("service_ids", {
                        validate: (value) =>
                          value.length > 0 || "حداقل یک سرویس انتخاب کنید",
                      })}
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            )}
            {errors.service_ids && (
              <p className="text-red-500 text-sm mt-1">
                {errors.service_ids.message}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              سرویس‌های انتخاب‌شده: {JSON.stringify(selectedServiceIds)}
            </p>
          </div>

          <div>
            <label htmlFor="package-image">
              <div className="bg-gray-200 text-gray-800 hover:bg-gray-300 border-2 border-gray-300 rounded-xl py-2 px-4 flex items-center gap-2">
                انتخاب عکس <IoCamera size={20} />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="package-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 rounded-md"
              />
            )}
          </div>

          <Button
            variant="add"
            type="submit"
            disabled={addPackageMutation.isPending}
          >
            {addPackageMutation.isPending ? "درحال افزودن..." : "افزودن"}
          </Button>
        </form>
      </CustomModal>

      {/* Update Package Modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        title="بروزرسانی پکیج"
      >
        Update
      </CustomModal>

      {/* Delete Package Modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف پکیج"
      >
        <div className="flex flex-col gap-4">
          {packages.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-xl border border-gray-200 p-2"
            >
              <h4 className="text-base font-medium text-gray-800">{p.name}</h4>
              <button
                className="text-xl text-red-500 absolute top-3 left-3 hover:text-red-600 transition"
                onClick={() => handleRemovePackage(p.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Link
            to={`/packages/${pkg.id}`}
            key={pkg.id}
            className="bg-white border border-gray-300 rounded-xl p-4 flex flex-row items-center justify-between hover:bg-slate-100 transition"
          >
            <div className="space-y-2">
              <h4 className="text-base font-medium text-gray-800">
                {pkg.name}
              </h4>
              <p className="text-sm font-medium text-gray-600 line-clamp-1">
                {pkg.desc}
              </p>
            </div>
            <div>
              <img
                src={
                  pkg?.image
                    ? `https://queuingprojectapi.pythonanywhere.com${pkg.image}`
                    : "/images/no-image.jpg"
                }
                alt="Package Image"
                className="h-14 w-28 object-cover rounded-xl"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Packages;
