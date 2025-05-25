import React, { useState } from "react";
import { useAddSlider } from "../../hooks/sliders/useAddSlider";
import { useForm } from "react-hook-form";
import { SliderItems } from "../../types/sliders";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Button from "../../components/Button/Button";
import CustomModal from "../../components/CustomModal/CustomModal";
import { IoPersonAdd } from "react-icons/io5";
import { useGetSliders } from "../../hooks/sliders/useGetSliders";
import Loading from "../../components/Loading/Loading";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRemoveSlider } from "../../hooks/sliders/useRemoveSlider";
import { RxUpdate } from "react-icons/rx";
import { useUpdateSlider } from "../../hooks/sliders/useUpdateSlider";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useThemeColor } from "../../context/ThemeColor";

const Sliders: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [selectedSliderId, setSelectedSliderId] = useState<number | null>(null);
  const [selectedSlider, setSelectedSlider] = useState<SliderItems | null>(
    null
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Pick<SliderItems, "title" | "sub_title" | "is_active">>();
  const slidersMutation = useAddSlider();
  const removeSliderMutation = useRemoveSlider();
  const updateSliderMutation = useUpdateSlider();
  const { data: sliders, isPending, isError, error } = useGetSliders();
  const queryClient = useQueryClient();
  const { themeColor } = useThemeColor();

  if (isPending) return <Loading />;

  if (isError) {
    toast.error("خطا در بارگذاری اسلایدرها!");
    console.log(error);
  }

  const handleAddSlider = (
    data: Pick<SliderItems, "title" | "sub_title" | "is_active">
  ) => {
    slidersMutation.mutate(data, {
      onSuccess: () => {
        toast.success("اسلایدر با موفقیت ایجاد شد!");
        queryClient.invalidateQueries({ queryKey: ["sliders"] });
        reset();
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        toast.error("خطا در ایجاد اسلایدر!");
      },
    });
    setIsAddOpen(false);
    reset();
  };

  const handleRemoveEmployee = (id: number) => {
    const removeSliderId = toast.loading("لطفا منتظر بمانید...");
    removeSliderMutation.mutate(id, {
      onSuccess: () => {
        toast.success("اسلایدر مورد نظر با موفقیت حذف شد", {
          id: removeSliderId,
        });
        queryClient.invalidateQueries({ queryKey: ["sliders"] });
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        toast.error("خطا در حذف اسلایدر!", { id: removeSliderId });
      },
    });
  };

  const handleSlider = (slider: SliderItems) => {
    setSelectedSlider(slider);
    setSelectedSliderId(slider.id);
  };

  const handleUpdateSlider = () => {
    if (!selectedSlider) {
      toast.error("لطفا اسلایدر مورد نظر را انتخاب کنید!");
      return;
    } else if (!selectedSliderId) {
      toast.error("شناسه اسلایدر معتبر نیست!");
      return;
    }

    const data = {
      id: selectedSliderId,
      title: selectedSlider?.title || "",
      sub_title: selectedSlider?.sub_title || "",
      is_active: selectedSlider?.is_active || false,
    };

    updateSliderMutation.mutate(data, {
      onSuccess: () => {
        toast.success("اسلایدر با موفقیت بروزرسانی شد!");
        setIsUpdateOpen(false);
        queryClient.invalidateQueries({ queryKey: ["sliders"] });
      },
      onError: (error) => {
        const axiosEror = error as AxiosError;
        console.log(axiosEror);
        toast.error("خطا در بروزرسانی اسلایدر!");
      },
    });
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap items-center gap-2">
        <button
          className="bg-sky-100 text-sky-500 hover:bg-sky-200 transition rounded-xl py-1 px-3 flex items-center gap-2 border border-sky-300"
          onClick={() => setIsAddOpen(true)}
        >
          افزودن <IoPersonAdd />
        </button>
        <button
          className="bg-green-100 text-green-500 hover:bg-green-200 transition rounded-xl py-1 px-3 flex items-center gap-2 border border-green-300"
          onClick={() => setIsUpdateOpen(true)}
        >
          بروزرسانی <RxUpdate />
        </button>
        <button
          className="bg-red-100 text-red-500 hover:bg-red-200 transition rounded-xl py-1 px-3 flex items-center gap-2 border border-red-300"
          onClick={() => setIsDeleteOpen(true)}
        >
          حذف <FaTrashCan />
        </button>
      </div>

      {/* Add Slider Modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن اسلایدر"
      >
        <form
          onSubmit={handleSubmit(handleAddSlider)}
          className="space-y-5 mt-8"
        >
          <div>
            <label className="block mb-1 font-medium">عنوان</label>
            <input
              type="text"
              {...register("title", {
                required: "عنوان الزامی است",
                maxLength: {
                  value: 30,
                  message: "عنوان نمیتواند بیشتر از 30 کاراکتر باشد",
                },
              })}
              className="primary-input"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">زیرعنوان</label>
            <textarea
              {...register("sub_title", {
                required: "زیرعنوان الزامی است",
                maxLength: {
                  value: 60,
                  message: "زیرعنوان نمیتواند بیشتر از 60 کاراکتر باشد",
                },
              })}
              className="primary-input"
              rows={3}
            ></textarea>
            {errors.sub_title && (
              <span className="text-red-500 text-sm">
                {errors.sub_title.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("is_active")}
              className="accent-orange-500"
              id="is_active_id"
            />
            <label htmlFor="is_active_id">فعال باشد</label>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ارسال..." : "ایجاد اسلایدر"}
          </Button>
        </form>
      </CustomModal>

      {/* Update Slider Modal */}
      <CustomModal
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedSlider(null);
        }}
        title="بروزرسانی اسلایدر"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="عنوان"
            defaultValue={selectedSlider?.title}
            onChange={(e) => {
              setSelectedSlider((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              );
            }}
            className="primary-input"
          />
          <textarea
            rows={2}
            className="primary-input"
            placeholder="زیرعنوان"
            defaultValue={selectedSlider?.sub_title}
            onChange={(e) =>
              setSelectedSlider((prev) =>
                prev ? { ...prev, sub_title: e.target.value } : null
              )
            }
          ></textarea>
          <Button onClick={handleUpdateSlider}>بروزرسانی اسلایدر</Button>
          {sliders?.map((slider) => (
            <div
              key={slider.id}
              className={`flex items-center gap-4 relative border-s-2 border-s-${themeColor}-500 rounded-xl border border-gray-200 p-2`}
            >
              <p>{slider.title}</p>
              <button
                className={`text-xl text-${themeColor}-500 absolute top-3 left-2 hover:text-${themeColor}-600 transition`}
                onClick={() => handleSlider(slider)}
              >
                <FaPencil />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      {/* Remove Slider Modal */}
      <CustomModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="حذف اسلایدر"
      >
        <div className="space-y-4">
          {sliders?.map((slider) => (
            <div
              key={slider.id}
              className="flex items-center gap-4 relative border-s-2 border-s-red-500 rounded-xl border border-gray-200 p-2"
            >
              <p>{slider.title}</p>
              <button
                className="text-xl text-red-500 absolute top-3 left-2 hover:text-red-600 transition"
                onClick={() => handleRemoveEmployee(slider.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>

      <div className="mt-8">
        <PageTitle title="اسلایدر ها" />
        <div className="mt-5">
          <div className="grid grid-cols-1 gap-4">
            {sliders?.map((slider) => (
              <div
                key={slider.id}
                className="rounded-xl p-4 transition bg-white shadow-md"
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  {slider.title}
                </h4>
                <p
                  className="text-sm text-gray-500 mb-4 line-clamp-2 cursor-pointer"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    target.classList.toggle("line-clamp-2");
                  }}
                >
                  {slider.sub_title}
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    slider.is_active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {slider.is_active ? "فعال" : "غیرفعال"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliders;
