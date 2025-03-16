import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation/Navigation";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
        <Navigation />
      </main>
    </div>
  );
};

export default MainLayout;
