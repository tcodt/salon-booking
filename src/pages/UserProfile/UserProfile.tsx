import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const getBackToPreviousPage = () => {
    navigate(-1);
  };

  const genderOptions = [
    { value: "male", label: "مرد" },
    { value: "female", label: "زن" },
    { value: "other", label: "سایر" },
  ];

  const handleGenderChange = (value: string) => {
    console.log("Selected Gender", value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-orange-500 font-medium text-2xl">پروفایل</span>
        <button
          className="cursor-pointer text-orange-500"
          onClick={getBackToPreviousPage}
        >
          <BsArrowLeft size={25} />
        </button>
      </div>

      <div className="mb-8">
        <ImageUploader />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="md:w-2/4 w-full">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base h-12 w-full"
          />
        </label>
        <label className="md:w-2/4 w-full">
          <input
            type="email"
            placeholder="ایمیل"
            className="outline-2 outline-transparent focus:outline-orange-500 bg-slate-100 py-2 px-4 rounded-xl text-gray-800 font-medium text-base h-12 w-full text-left"
          />
        </label>
        <Dropdown
          label="جنسیت"
          options={genderOptions}
          onChange={handleGenderChange}
        />
        <Button type="submit">ادامه</Button>
      </form>
    </section>
  );
};

export default UserProfile;
