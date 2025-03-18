"use client";

import ThemeSwitcher from "@/utils/themeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const DashboardHeaders = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" flex items-center justify-end p-6 fixed top-0 right-0 duration-300 z-[1100] ">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen((open) => !open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>

      {open && (
        <div className="w-[300px] h-[50vh] p-3 dark:bg-[#555555] bg-white shadow-xl absolute top-16 right-0 z-[1500] rounded-xl">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000001]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <div>
              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, sequi! Tempore libero omnis et, ea beate ut, itaque
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 days ago
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeaders;
