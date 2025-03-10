import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h1 className=" text-4xl text-gray-700">صفحه اصلی</h1>
      <button
        className="py-2 px-4 rounded-xl bg-red-500 text-white text-base font-medium cursor-pointer hover:bg-red-700 transition"
        onClick={logout}
      >
        خروج
      </button>
    </div>
  );
};

export default HomePage;
