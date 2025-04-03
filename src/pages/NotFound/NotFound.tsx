import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div>
      <img src="/images/not-found.svg" alt="Not Found" className="w-full" />
      <div className="p-4 text-center">
        <h4 className="text-xl text-gray-700 font-medium mt-4">
          صفحه مورد نظر یافت نشد!
        </h4>
        <Link
          to="/home"
          className="inline-block bg-orange-500 rounded-xl text-white hover:bg-orange-600 transition text-base py-2 px-4 mt-12"
        >
          برگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
