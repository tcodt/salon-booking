import React from "react";
import { Outlet } from "react-router";

const Dashboard: React.FC = () => {
  return (
    <section>
      <h1>صفحه داشبورد</h1>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
