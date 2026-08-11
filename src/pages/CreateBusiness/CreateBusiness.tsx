import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import {
  FaStore,
  FaLink,
  FaTag,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { BusinessData, businessSchema } from "../../schemas/business.schema";
import { useAddBusiness } from "../../hooks/business/useAddBusiness";
import toast from "react-hot-toast";

const CreateBusiness: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      slug: "",
      business_type: "",
      address: "",
      phone_number: "",
    },
  });
  const navigate = useNavigate();
  const addBusinessMutation = useAddBusiness();

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: BusinessData) => {
    addBusinessMutation.mutate(data, {
      onSuccess: (business) => {
        if (business?.is_active) {
          toast.success("کسب‌وکار با موفقیت فعال شد!");
        } else {
          toast.success("درخواست ثبت شد. در انتظار تأیید...");
        }
        navigate("/waiting-room");
      },
      onError: () => {
        toast.error("خطا در ثبت کسب‌وکار. لطفاً دوباره تلاش کنید.");
      },
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 min-h-full">
      <div className="bg-white dark:bg-gray-800 rounded-full p-2 flex justify-center items-center my-6">
        <img
          src="/images/logo-main.png"
          alt="Logo"
          className="w-40 h-40 object-contain rounded-full shadow-xl border border-primary-green-500"
        />
      </div>

      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-100 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            ثبت کسب‌وکار
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 text-center">
            لطفاً اطلاعات کسب‌وکار خود را وارد کنید.
          </p>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Business Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              نام کسب‌وکار
            </label>
            <div className="relative">
              <FaStore className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="مثلاً سالن زیبایی نیلوفر"
                className={`primary-input-green pr-10 ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              آدرس اختصاصی (Slug)
            </label>
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="niloufar-beauty"
                className={`primary-input-green pl-10 text-left ${
                  errors.slug ? "border-red-500 focus:border-red-500" : ""
                }`}
                dir="ltr"
                {...register("slug")}
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.slug.message}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              این مقدار در لینک اختصاصی کسب‌وکار شما استفاده می‌شود.
            </p>
          </div>

          {/* Business Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              نوع کسب‌وکار
            </label>
            <div className="relative">
              <FaTag className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <select
                className={`primary-input-green pr-10 dark:bg-gray-700 dark:text-gray-100 ${
                  errors.business_type
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                {...register("business_type")}
              >
                <option value="">انتخاب کنید</option>
                <option value="salon">سالن زیبایی</option>
                <option value="barbershop">آرایشگاه مردانه</option>
                <option value="spa">اسپا</option>
                <option value="clinic">کلینیک</option>
                <option value="gym">باشگاه ورزشی</option>
              </select>
            </div>
            {errors.business_type && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.business_type.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              آدرس
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute right-3 top-3 text-gray-400 dark:text-gray-500" />
              <textarea
                rows={4}
                placeholder="آدرس کامل کسب‌وکار را وارد کنید..."
                className={`primary-input-green pr-10 h-auto min-h-[6rem] ${
                  errors.address ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              شماره تماس
            </label>
            <div className="relative">
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="tel"
                placeholder="09123456789"
                className={`primary-input-green pr-10 ${
                  errors.phone_number
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                {...register("phone_number")}
              />
            </div>
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="delete"
              onClick={handleBack}
              disabled={addBusinessMutation.isPending}
            >
              انصراف
            </Button>

            <Button type="submit" variant="green">
              {addBusinessMutation.isPending ? "در حال ثبت..." : "ثبت کسب‌وکار"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
