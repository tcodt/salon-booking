import React, { useState } from "react";
import OptionsBox from "../../components/OptionsBox/OptionsBox";
import { IoCamera, IoPersonAdd } from "react-icons/io5";
// import { RxUpdate } from "react-icons/rx";
// import { FaTrashCan } from "react-icons/fa6";
import CustomModal from "../../components/CustomModal/CustomModal";
import Button from "../../components/Button/Button";
import { useGetPackages } from "../../hooks/packages/useGetPackages";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AddPackage } from "../../types/packages";
// import { useAddPackage } from "../../hooks/packages/useAddPackage";
// import { AxiosError } from "axios";
// import { useQueryClient } from "@tanstack/react-query";

const Packages: React.FC = () => {
  const { register, handleSubmit } = useForm<AddPackage>();
  const { data: packages, isPending, isError, error } = useGetPackages();
  // const addPackageMutation = useAddPackage();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  // const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  // const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  // const queryClient = useQueryClient();

  if (isPending) return <Loading />;

  if (isError) {
    console.log(error);
    toast.error("خطا در دریافت پکیج ها");
  }

  const handleAddPackage = async (data: AddPackage) => {
    console.log(data);
    // const formData = new FormData();

    // formData.append("business", "1");
    // formData.append("name", data.name);
    // formData.append("desc", data.desc);
    // formData.append("total_price", data.total_price.toString());

    // if (data.image && data.image[0]) {
    //   formData.append("image", data.image[0]);
    // }

    // const toastId = toast.loading("درحال افزودن پکیج");

    // addPackageMutation.mutate(formData, {
    //   onSuccess: () => {
    //     toast.success("پکیج با موفقیت اضافه شد", { id: toastId });
    //     console.log("Data: ", formData);
    //     queryClient.invalidateQueries({ queryKey: ["packages"] });
    //     reset();
    //     setIsAddOpen(false);
    //   },
    //   onError: (error) => {
    //     const axiosError = error as AxiosError;
    //     console.log(axiosError);
    //     toast.error("خطا در افزودن پکیج", { id: toastId });
    //   },
    // });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <OptionsBox
          onClick={() => setIsAddOpen(true)}
          title="افزودن"
          color="blue"
          icon={<IoPersonAdd />}
        />
        {/* <OptionsBox
          onClick={() => setIsUpdateOpen(true)}
          title="بروزرسانی"
          color="orange"
          icon={<RxUpdate />}
        />
        <OptionsBox
          onClick={() => setIsDeleteOpen(true)}
          title="حذف"
          color="red"
          icon={<FaTrashCan />}
        /> */}
      </div>

      <h3 className="primary-title">پکیج ها</h3>

      {!packages?.length && (
        <div className="text-center p-6 text-red-500">هیچ پکیجی یافت نشد!</div>
      )}

      {/* Add Package Modal */}
      <CustomModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="افزودن پکیج"
      >
        <div>
          <form
            onSubmit={handleSubmit(handleAddPackage)}
            className="flex flex-col gap-6"
          >
            <input
              type="text"
              className="primary-input"
              placeholder="نام پکیج"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              className="primary-input"
              placeholder="توضیحات"
              {...register("desc", { required: true })}
            />
            <input
              type="text"
              className="primary-input"
              placeholder="قیمت کل"
              {...register("total_price", { required: true })}
            />
            <label htmlFor="package-image">
              <div className="bg-orange-100 text-orange-500 rounded-xl py-2 px-4 flex items-center gap-2 text-base h-12">
                انتخاب عکس <IoCamera size={20} />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="package-image"
              accept="image/*"
              {...register("image")}
              // onChange={handleImageChange}
            />

            <label htmlFor="media-files">
              <div className="bg-orange-100 text-orange-500 rounded-xl py-2 px-4 flex items-center gap-2 text-base h-12">
                فایل های رسانه <IoCamera size={20} />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="media-files"
              accept="image/*,video/*"
              {...register("media_files")}
            />

            <Button type="submit">افزودن</Button>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default Packages;
