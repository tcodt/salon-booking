import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import TopBar from "../components/TopBar/TopBar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <TopBar />
        <Outlet />
        <Navigation />
      </main>
    </div>
  );
};

export default MainLayout;
