import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

// Define proper types for variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

// const cardVariants = {
//   inactive: {
//     scale: 1,
//     borderColor: "#e5e7eb",
//     backgroundColor: "white",
//     transition: { duration: 0.2 },
//   },
//   active: {
//     scale: 1.02,
//     borderColor: "#2563eb",
//     backgroundColor: "#eff6ff",
//     transition: { duration: 0.2 },
//   },
//   hover: {
//     scale: 1.02,
//     borderColor: "#93c5fd",
//     transition: { duration: 0.15 },
//   },
// };

const RoleAuthentication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<"customer" | "owner" | null>(
    null,
  );
  const navigate = useNavigate();

  const handleSelect = (type: "customer" | "owner") => {
    setSelectedType(type);
  };

  const handleConfirm = () => {
    if (!selectedType) return;
    setIsSubmitting(true);
    if (selectedType === "owner") {
      navigate("/create-business");
    } else {
      navigate("/random-code-input");
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-full p-2 flex justify-center items-center my-6">
        <img
          src="/images/logo-main.png"
          alt="Logo"
          className="w-40 h-40 object-contain rounded-full shadow-xl border border-primary-green-500"
        />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" as const }}
            className={`inline-block p-4 bg-primary-green-100 rounded-full mb-4`}
          >
            <svg
              className={`w-12 h-12 text-primary-green-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            انتخاب نقش کاربری
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            لطفاً نوع کاربری خود را انتخاب کنید
          </p>
          <div
            className={`w-24 h-1 bg-primary-green-500 mx-auto mt-4 rounded-full`}
          />
        </motion.div>

        {/* Selection Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {/* Customer Card */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            animate={selectedType === "customer" ? "active" : "inactive"}
            // Remove the duplicate variants prop - use custom prop for card variants
            custom={selectedType === "customer" ? "active" : "inactive"}
            onClick={() => handleSelect("customer")}
            className={`relative rounded-2xl border-2 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${selectedType === "customer" ? `border-primary-green-500 bg-primary-green-100` : "border-gray-300 bg-white"}`}
          >
            {selectedType === "customer" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-3 -right-3 bg-primary-green-600 text-white rounded-full p-1 shadow-lg`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className={`w-10 h-10 text-primary-green-600`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">کاربر عادی</h3>
              <p className="text-gray-500 text-sm mt-1">
                دسترسی به خدمات عمومی
              </p>
              <ul className="mt-3 text-right text-sm text-gray-600 space-y-1 w-full pr-4">
                <li>• مشاهده و جستجوی خدمات</li>
                <li>• ثبت درخواست‌ها</li>
                <li>• پیگیری وضعیت</li>
              </ul>
            </div>
          </motion.div>

          {/* Owner Card */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            animate={selectedType === "owner" ? "active" : "inactive"}
            // Remove the duplicate variants prop
            custom={selectedType === "owner" ? "active" : "inactive"}
            onClick={() => handleSelect("owner")}
            className={`relative rounded-2xl border-2 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${selectedType === "owner" ? `border-primary-green-500 bg-primary-green-100` : "border-gray-300 bg-white"}`}
          >
            {selectedType === "owner" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-3 -right-3 bg-primary-green-600 text-white rounded-full p-1 shadow-lg`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className={`w-10 h-10 text-primary-green-600`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">مالک</h3>
              <p className="text-gray-500 text-sm mt-1">دسترسی به پنل مدیریت</p>
              <ul className="mt-3 text-right text-sm text-gray-600 space-y-1 w-full pr-4">
                <li>• مدیریت کاربران</li>
                <li>• پردازش درخواست‌ها</li>
                <li>• گزارش‌گیری پیشرفته</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Confirm Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            whileHover={selectedType ? { scale: 1.03 } : {}}
            whileTap={selectedType ? { scale: 0.97 } : {}}
            onClick={handleConfirm}
            disabled={!selectedType || isSubmitting}
            className={`relative w-full md:w-auto px-12 py-4 rounded-2xl font-bold text-white text-lg shadow-lg transition-all duration-200 ${
              selectedType
                ? `bg-primary-green-600 hover:shadow-primary-green-500/30`
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>در حال ثبت...</span>
              </motion.div>
            ) : (
              <span>تأیید و ادامه</span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RoleAuthentication;
