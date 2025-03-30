import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <section className="w-screen h-screen p-4 pb-[160px]">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
