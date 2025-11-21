// src/components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Reduced ml from 64 to 56 to shrink gap */}
      <div className="flex-1 ml-56 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;




