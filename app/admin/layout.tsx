"use client";

import React, { useState } from "react";
import AdminSidebar from "../components/admin/sideBar/AdminSidebar";
import { AdminProtected } from "../hooks/adminProtected";
import DashBoardHero from "../components/admin/dashBoardHero";
import { HeaderSEO } from "@/utils/headerSEO";

const Layout = ({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? "70px" : "240px";

  return (
    <AdminProtected>
      <div className="w-full min-h-screen">
        <HeaderSEO
          title="Elearning - Admin"
          descripion="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
          keyWords="Nextjs, React, Javascript, Redux, MERN"
        />
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`fixed h-full shadow-lg z-10 transition-all duration-300`}
            style={{ width: sidebarWidth }}
          >
            <AdminSidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>

          {/* Main Content */}
          <div
            className={`flex-grow p-5 transition-all duration-300 mt-20 h-auto `}
            style={{ marginLeft: sidebarWidth }}
          >
            <div className="max-w-screen-2xl mx-auto">
              <DashBoardHero />
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Layout;
