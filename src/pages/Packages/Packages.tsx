/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { IoCamera } from "react-icons/io5";
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
import {
  AddPackage,
  Packages as PackagesType,
  UpdatePackage,
} from "../../types/packages";
import { Link } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRemovePackage } from "../../hooks/packages/useRemovePackage";
import { useUpdatePackage } from "../../hooks/packages/useUpdatePackage";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";
import { useGetBusinesses } from "../../hooks/business/useGetBusinesses";
import Dropdown from "../../components/Dropdown/Dropdown";

const Packages: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<PackagesType | null>(
    null
  );

  // Form جداگانه برای افزودن
  const addForm = useForm<AddPackage>({
    defaultValues: {
      business_id: 0,
      name: "",
      desc: "",
      total_price: "",
      service_ids: [],
    },
  });

  // Form جداگانه برای بروزرسانی
  const updateForm = useForm<UpdatePackage>({
    defaultValues: {
      business_id: 0,
      name: "",
      desc: "",
      total_price: "",
      service_ids: [],
    },
  });

  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    formState: { errors: addErrors },
    reset: addReset,
  } = addForm;

  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
  } = updateForm;

  const { data: packages, isPending, isError, error } = useGetPackages();
  const { data: servicesData = [] } = useGetServices();
  const { data: businessData } = useGetBusinesses();
  const addPackageMutation = useAddPackage();
  const removePackageMutation = useRemovePackage();
  const updatePackageMutation = useUpdatePackage();
  const queryClient = useQueryClient();
  const { themeColor } = useThemeColor();

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

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
    if (!data.business_id || data.business_id === 0) {
      toast.error("لطفا یک بیزینس معتبر انتخاب کنید");
      return;
    }

    if (data.service_ids.length === 0 || data.service_ids.includes(0)) {
      toast.error("لطفا حداقل یک سرویس معتبر انتخاب کنید");
      return;
    }

    if (!image) {
      toast.error("لطفا یک عکس انتخاب کنید");
      return;
    }

    if (data.service_ids.length === 0) {
      toast.error("لطفا حداقل یک سرویس انتخاب کنید");
      return;
    }

    if (!businessData) return;

    const toastId = toast.loading("درحال افزودن پکیج");

    const formData = new FormData();
    formData.append("business_id", data.business_id?.toString() || "1");
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("total_price", data.total_price.replace(/,/g, ""));
    formData.append("image", image);

    // اصلاح: بدون [] و map(Number) برای consistency
    (data.service_ids ?? []).map(Number).forEach((id) => {
      formData.append("service_ids", id.toString());
    });

    //! Log for bugs
    console.log("Sending data:", {
      business_id: data.business_id,
      service_ids: data.service_ids,
      hasImage: !!image,
    });

    addPackageMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("پکیج با موفقیت اضافه شد", { id: toastId });
        queryClient.invalidateQueries({ queryKey: ["packages"] });
        addReset();
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

  useEffect(() => {
    if (selectedPackage) {
      updateReset({
        business_id: selectedPackage.business?.id || 0,
        name: selectedPackage.name,
        desc: selectedPackage.desc,
        total_price: selectedPackage.total_price,
        service_ids:
          selectedPackage.services?.map((service) => service.id) || [],
      });
      setPreview(
        selectedPackage.image
          ? `https://queuingprojectapi.pythonanywhere.com${selectedPackage.image}`
          : null
      );
    } else {
      updateReset({
        business_id: 0,
        name: "",
        desc: "",
        total_price: "",
        service_ids: [],
      });
      setPreview(null);
    }
  }, [selectedPackage, updateReset]);

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

  const handleUpdatePackage = (pkg: any) => {
    updateReset(pkg);
    setSelectedPackage(pkg);
  };

  const handleUpdateSubmit = (data: UpdatePackage) => {
    if (!selectedPackage) {
      toast.error("هیچ پکیجی انتخاب نشده است");
      return;
    }

    if (!image && !selectedPackage.image) {
      toast.error("لطفا یک تصویر انتخاب کنید");
      return;
    }

    if (data.service_ids.length === 0) {
      toast.error("لطفا حداقل یک سرویس انتخاب کنید");
      return;
    }

    console.log(data);

    const toastId = toast.loading("درحال بروزرسانی پکیج...");

    const formDataUpdate = new FormData();
    formDataUpdate.append("business_id", data.business_id.toString() || "1");
    formDataUpdate.append("name", data.name);
    formDataUpdate.append("desc", data.desc);
    formDataUpdate.append("total_price", data.total_price.replace(/,/g, ""));
    if (image) {
      formDataUpdate.append("image", image);
    }

    // اصلاح: بدون [] و map(Number)
    (data.service_ids ?? []).map(Number).forEach((id) => {
      formDataUpdate.append("service_ids", id.toString());
    });

    updatePackageMutation.mutate(
      { id: selectedPackage.id, formData: formDataUpdate },
      {
        onSuccess: () => {
          toast.success("پکیج با موفقیت بروزرسانی شد", { id: toastId });
          queryClient.invalidateQueries({ queryKey: ["packages"] });
          updateReset();
          setImage(null);
          setPreview(null);
          setSelectedPackage(null);
        },
        onError: (error) => {
          const axiosError = error as AxiosError;
          toast.error("خطا در بروزرسانی پکیج!", { id: toastId });
          console.log("An error occured: ", axiosError);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {!packages?.length && (
        <div className="text-center p-6 text-gray-500">هیچ پکیجی یافت نشد!</div>
      )}

      {/* Add Package Modal  */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          addReset();
          setImage(null);
          setPreview(null);
        }}
        title="افزودن پکیج"
      >
        <form
          onSubmit={addHandleSubmit(handleAddPackage)}
          className="flex flex-col gap-6"
        >
          <div>
            <input
              type="text"
              className="primary-input"
              placeholder="نام پکیج"
              {...addRegister("name", { required: "نام پکیج الزامی است" })}
            />
            {addErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {addErrors.name.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              className="primary-input"
              placeholder="توضیحات"
              {...addRegister("desc", { required: "توضیحات الزامی است" })}
            ></textarea>
            {addErrors.desc && (
              <p className="text-red-500 text-sm mt-1">
                {addErrors.desc.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              className="primary-input"
              placeholder="قیمت"
              {...addRegister("total_price", {
                required: "قیمت الزامی است",
                onChange: (e) => {
                  const value = e.target.value.replace(/,/g, "");
                  e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
              })}
            />
            {addErrors.total_price && (
              <p className="text-red-500 text-sm mt-1">
                {addErrors.total_price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
              سرویس‌ها
            </label>
            {servicesData.length === 0 ? (
              <p className="text-red-500 text-sm">هیچ سرویسی در دسترس نیست</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {servicesData.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 dark:text-gray-300"
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      {...addRegister("service_ids", {
                        validate: (value) =>
                          value.length > 0 || "حداقل یک سرویس انتخاب کنید",
                        valueAsNumber: true,
                      })}
                      className={`accent-${themeColor}-500`}
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            )}
            {addErrors.service_ids && (
              <p className="text-red-500 text-sm mt-1">
                {addErrors.service_ids.message}
              </p>
            )}
          </div>

          <div>
            <select
              className="primary-input"
              {...addRegister("business_id", {
                required: true,
                valueAsNumber: true,
              })}
            >
              <option value={0}>انتخاب بیزینس</option>
              {businessData?.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="package-image">
              <div className="bg-white text-gray-500 hover:bg-slate-100 border-2 border-gray-300 rounded-xl border-dashed p-4 cursor-pointer dark:bg-gray-900 dark:border-gray-600">
                <span className="flex items-center gap-2">
                  انتخاب عکس <IoCamera size={20} />
                </span>
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
            variant="primary"
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
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedPackage(null);
          updateReset();
          setImage(null);
          setPreview(null);
        }}
        title="بروزرسانی پکیج"
      >
        {selectedPackage && (
          <form
            onSubmit={updateHandleSubmit(handleUpdateSubmit)}
            className="flex flex-col gap-6 mb-8"
          >
            <div>
              <input
                type="text"
                className="primary-input"
                placeholder="نام پکیج"
                {...updateRegister("name", { required: "نام پکیج الزامی است" })}
              />
              {updateErrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {updateErrors.name.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                className="primary-input"
                placeholder="توضیحات"
                {...updateRegister("desc", { required: "توضیحات الزامی است" })}
              ></textarea>
              {updateErrors.desc && (
                <p className="text-red-500 text-sm mt-1">
                  {updateErrors.desc.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                className="primary-input"
                placeholder="قیمت"
                {...updateRegister("total_price", {
                  required: "قیمت الزامی است",
                  onChange: (e) => {
                    const value = e.target.value.replace(/,/g, "");
                    e.target.value = value.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    );
                  },
                })}
              />
              {updateErrors.total_price && (
                <p className="text-red-500 text-sm mt-1">
                  {updateErrors.total_price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                سرویس‌ها
              </label>
              {servicesData.length === 0 ? (
                <p className="text-red-500 text-sm">هیچ سرویسی در دسترس نیست</p>
              ) : (
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                  {servicesData.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-2 text-sm cursor-pointer text-gray-600 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        value={service.id}
                        {...updateRegister("service_ids", {
                          validate: (value) =>
                            value.length > 0 || "حداقل یک سرویس انتخاب کنید",
                          valueAsNumber: true,
                        })}
                        defaultChecked={selectedPackage?.services
                          .map((service) => service.id)
                          ?.includes(service.id)}
                        className={`accent-${themeColor}-500`}
                      />
                      {service.name}
                    </label>
                  ))}
                </div>
              )}
              {updateErrors.service_ids && (
                <p className="text-red-500 text-sm mt-1">
                  {updateErrors.service_ids.message}
                </p>
              )}
            </div>

            <div>
              <select
                className="primary-input"
                {...updateRegister("business_id", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                <option value={0}>انتخاب بیزینس</option>
                {businessData?.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="package-image">
                <div className="bg-white text-gray-500 hover:bg-slate-100 border-2 border-gray-300 rounded-xl border-dashed p-4 cursor-pointer dark:bg-gray-900 dark:border-gray-600">
                  <span className="flex items-center gap-2">
                    انتخاب عکس <IoCamera size={20} />
                  </span>
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
              variant="primary"
              type="submit"
              disabled={updatePackageMutation.isPending}
            >
              {updatePackageMutation.isPending
                ? "درحال بروزرسانی..."
                : "بروزرسانی"}
            </Button>
          </form>
        )}
        <div className="flex flex-col gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-e-xl p-2 bg-slate-100 dark:bg-gray-700 shadow-md`}
            >
              <div className="space-y-2">
                <h4 className="text-base text-gray-800 font-normal dark:text-gray-200">
                  {pkg.name}
                </h4>
                <p className="text-sm text-gray-500 font-thin line-clamp-1 dark:text-gray-400">
                  {pkg.desc}
                </p>
              </div>
              <button
                className={`text-xl text-${themeColor}-500 absolute top-6 left-4 hover:text-${themeColor}-600 transition`}
                onClick={() => handleUpdatePackage(pkg)}
              >
                <FaPencil />
              </button>
            </div>
          ))}
        </div>
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
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-e-xl p-4 bg-slate-100 dark:bg-gray-700 shadow-md"
            >
              <h4 className="text-base font-medium text-gray-800 dark:text-gray-300">
                {p.name}
              </h4>
              <button
                className="text-xl text-red-500 absolute top-5 left-3 hover:text-red-600 transition"
                onClick={() => handleRemovePackage(p.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <div className="flex flex-row justify-between items-center mt-8">
        <PageTitle title="پکیج ها" />
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

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Link
            to={`/packages/${pkg.id}`}
            key={pkg.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-row items-center justify-between dark:bg-gray-700"
          >
            <div className="space-y-2 flex-1">
              <h4 className="text-base font-medium text-gray-800 dark:text-white">
                {pkg.name}
              </h4>
              <p className="text-sm font-medium text-gray-600 line-clamp-1 dark:text-gray-300">
                {pkg.desc}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
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
