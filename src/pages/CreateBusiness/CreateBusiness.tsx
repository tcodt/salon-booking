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
    if (data) {
      addBusinessMutation.mutate(data, {
        onSuccess: (business) => {
          // If backend already activated the business, skip waiting room
          if (business?.is_active) {
            toast.success("کسب‌وکار با موفقیت فعال شد!");
            navigate("/waiting-room"); // WaitingRoom shows congratulations when is_active
            return;
          }
          toast.success("درخواست ثبت شد. در انتظار تأیید...");
          navigate("/waiting-room");
        },
        onError: () => {
          toast.error("خطا در ثبت کسب‌وکار. لطفاً دوباره تلاش کنید.");
        },
      });
    }
  };

  // Data Display
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-full p-2 flex justify-center items-center my-6">
        <img
          src="/images/logo-main.png"
          alt="Logo"
          className="w-40 h-40 object-contain rounded-full shadow-xl border border-primary-green-500"
        />
      </div>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg border border-gray-100">
        <div className="border-b border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            ثبت کسب‌وکار
          </h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            لطفاً اطلاعات کسب‌وکار خود را وارد کنید.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Business Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              نام کسب‌وکار
            </label>
            <div className="relative">
              <FaStore className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="مثلاً سالن زیبایی نیلوفر"
                className={`primary-input-green pr-10 ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              آدرس اختصاصی (Slug)
            </label>
            <div className="relative">
              <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="niloufar-beauty"
                className={`primary-input-green pl-10 text-left ${errors.slug ? "border-red-500 focus:border-red-500" : ""}`}
                dir="ltr"
                {...register("slug")}
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              این مقدار در لینک اختصاصی کسب‌وکار شما استفاده می‌شود.
            </p>
          </div>

          {/* Business Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              نوع کسب‌وکار
            </label>
            <div className="relative">
              <FaTag className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className={`primary-input-green pr-10 ${errors.business_type ? "border-red-500 focus:border-red-500" : ""}`}
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
              <p className="mt-1 text-sm text-red-600">
                {errors.business_type.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              آدرس
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute right-3 top-3 text-gray-400" />
              <textarea
                rows={4}
                cols={4}
                placeholder="آدرس کامل کسب‌وکار را وارد کنید..."
                className={`primary-input-green pr-10 ${errors.address ? "border-red-500 focus:border-red-500" : ""}`}
                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              شماره تماس
            </label>
            <div className="relative">
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="09123456789"
                className={`primary-input-green pr-10 ${errors.phone_number ? "border-red-500 focus:border-red-500" : ""}`}
                {...register("phone_number")}
              />
            </div>
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-600">
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
