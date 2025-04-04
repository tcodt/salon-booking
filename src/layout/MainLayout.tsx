import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <>
      <div
        id="mainPageForScroll"
        className="p-4 h-screen w-screen overflow-y-auto [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-slate-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <TopBar />
        <Sidebar />
        <main>
          <Outlet />
        </main>
        <Navigation />
      </div>
    </>
  );
};

export default MainLayout;
