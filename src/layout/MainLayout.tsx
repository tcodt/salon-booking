import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div
        id="mainPageForScroll"
        className="flex-1 p-4 overflow-y-auto -webkit-overflow-scrolling-touch
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-slate-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <TopBar />
        <main className="flex-1 min-h-screen pb-16">
          <Outlet />
        </main>
        <Navigation />
      </div>
      <Sidebar />
    </div>
  );
};

export default MainLayout;
