import React from "react";
import AdminSidebar from "../components/admin/sideBar/AdminSidebar";
import { AdminProtected } from "../hooks/adminProtected";
import DashBoardHero from "../components/admin/dashBoardHero";
import { HeaderSEO } from "@/utils/headerSEO";

const layout = ({
  children,
}: {
  children: React.ReactElement | React.ReactNode;
}) => {
  return (
    <AdminProtected>
      <div className="w-full">
        <HeaderSEO
          title="Elearning -  Admin"
          descripion="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
          keyWords="Nextjs, React, Javascript, Radux MERN"
        />
        <div className="flex h-[100vh]">
          {/* Sidebar */}
          {/* bg-gray-100 dark:bg-slate-800 w-[20%] */}
          <div className="fixed h-full shadow-lg z-10">
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="flex-grow ml-[20%]  p-5  transition-all duration-300">
            <div className="w-full mt-20">
              <DashBoardHero />
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default layout;
