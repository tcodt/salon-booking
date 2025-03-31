import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Sidebar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Navigation />
      </div>
    </>
  );
};

export default MainLayout;
