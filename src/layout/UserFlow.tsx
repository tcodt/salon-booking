import { Outlet } from "react-router";

const UserFlow = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main
        className="h-screen overflow-y-auto
    [-webkit-overflow-scrolling:touch]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserFlow;
