import React from "react";
import SidebarDashboard from "./sidebarDashboard";
import HeaderDashboard from "./hederDashboard";


const LayoutDashboard = ({ children }) => {
  return (
    <div className="flex flex-1">
      {/* Sticky Sidebar */}
      <div className="w-64 bg-white shadow-md sticky top-0 h-screen">
        <SidebarDashboard />
      </div>

      <div className="flex h-full bg-gray-100 flex-col w-full">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <HeaderDashboard />
        </div>

        <div className="flex-1 p-6 bg-gray-200 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
