import Image from "next/image";
import React, { SetStateAction, useEffect } from "react";
import customAvatar from "../../public/assets/profile_image.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import UserProfileInfo from "./profile/UserProfileInfo";
import UserCourseInfo from "./profile/UserCourseInfo";
import UserPasswordInfo from "./profile/UserPasswordInfo";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

interface profileProps {
  user: any;
  avatar: string | null;
  isActive: number;
  isLoading: boolean;
  setIsActive: React.Dispatch<SetStateAction<number>>;
  logOutUser: () => void;
}

const SideBarProfile = ({
  user,
  isActive,
  setIsActive,
  avatar,
  logOutUser,
  isLoading,
}: profileProps) => {
  return (
    <div className="w-full items-start justify-between mx-auto  flex md:flex-row max-sm:flex-col  h-full p-2 gap-10 md:flex-nowrap ">
      <div className="dark:bg-slate-900 w-auto md:w-[500px] sm:w-full flex md:flex-col sm:flex-row items-center justify-center mx-auto shadow-md rounded-lg bg-white dark:border-[#ffffff1d] p-5 border-[#ffffff12]">
        <div
          className={`w-full items-center py-4 px-3 cursor-pointer flex ${
            isActive === 1
              ? "dark:bg-slate-800 rounded-xl bg-red-200"
              : "bg-transparent"
          }`}
          onClick={() => setIsActive(1)}
        >
          <Image
            src={
              user.avatar.url || avatar
                ? user.avatar.url || avatar
                : customAvatar
            }
            alt={"profile_picture"}
            className="w-[20px] h-[20px]  cursor-pointer rounded-full sm:w-[30px] sm:h-[30px]"
            width={40}
            height={40}
          />
          <div className="pl-2 dark:text-white sm:block hidden font-Poppins text-black">
            My account
          </div>
        </div>
        <div
          className={`w-full  items-center py-4 px-3 cursor-pointer flex ${
            isActive === 2
              ? "dark:bg-slate-800 rounded-xl bg-red-200"
              : "bg-transparent"
          }`}
          onClick={() => setIsActive(2)}
        >
          <RiLockPasswordLine
            size={20}
            className="text-black dark:text-white"
          />
          <h5 className="pl-2 dark:text-white sm:block hidden font-Poppins text-black">
            Change Password
          </h5>
        </div>
        <div
          className={`w-full items-center py-4 px-3 cursor-pointer flex ${
            isActive === 3
              ? "dark:bg-slate-800 rounded-xl bg-red-200"
              : "bg-transparent"
          }`}
          onClick={() => setIsActive(3)}
        >
          <SiCoursera size={20} className="text-black dark:text-white" />
          <h5 className="pl-2 dark:text-white sm:block hidden font-Poppins text-black">
            Enrolled Courses
          </h5>
        </div>
        {user.role === "admin" && (
          <Link
            className={`w-full items-center py-4 px-3 cursor-pointer flex ${
              isActive === 4
                ? "dark:bg-slate-800 rounded-xl bg-red-200"
                : "bg-transparent"
            }`}
            href={"/admin"}
            passHref
          >
            <MdOutlineAdminPanelSettings
              size={20}
              className="text-black dark:text-white"
            />
            <h5 className="pl-2 dark:text-white sm:block hidden font-Poppins text-black">
              Admin Dashboard
            </h5>
          </Link>
        )}
        {isLoading ? (
          <div
            className={`w-full flex items-center gap-5 py-4 px-3 cursor-pointer `}
          >
            <ImSpinner className="w-6 h-6 text-black dark:text-white" />
            <span className="font-light dark:text-white text-black text-sm font-Poppins">
              Please wait...
            </span>
          </div>
        ) : (
          <div
            className={`w-full items-center py-4 px-3 cursor-pointer flex ${
              isActive === 5
                ? "dark:bg-slate-800 rounded-xl bg-red-200"
                : "bg-transparent"
            }`}
            onClick={() => logOutUser()}
          >
            <AiOutlineLogout size={20} className="text-black dark:text-white" />
            <h5 className="pl-2 dark:text-white sm:block hidden font-Poppins text-black">
              Log out
            </h5>
          </div>
        )}
      </div>

      <div className="rounded-xl dark:bg-slate-900 bg-white shadow-md w-full  dark:border-[#ffffff1d] p-5 border-[#ffffff12]">
        <div>
          {isActive === 1 && (
            <div>
              <UserProfileInfo user={user} avatar={avatar} />
            </div>
          )}
        </div>
        <div>
          {isActive === 2 && (
            <div>
              <UserPasswordInfo user={user} />
            </div>
          )}
        </div>
        <div>
          {isActive === 3 && (
            <div>
              <UserCourseInfo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
