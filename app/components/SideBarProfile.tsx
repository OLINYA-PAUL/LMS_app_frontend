import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
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
import CoursesCard, { CourseDatas } from "./CourseDetails/CoursesCard";
import { useSelector } from "react-redux";
import { useGetUserAllCoursesQuery } from "@/radux/features/course/course";

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
  const { data, isSuccess } = useGetUserAllCoursesQuery({});

  console.log("data home", data);

  const [courses, setCourses] = useState<CourseDatas[]>([]);

  const allCoureData = data ?? [];

  useEffect(() => {
    if (allCoureData) {
      setCourses(allCoureData?.courses);
    }
  }, [data, isSuccess]);

  // const { user: authUser } = useSelector((state: any) => state.auth);
  const isPurchased = user?.courses?.some((c: any) => {
    return c._id === data?.courses?._id;
  });

  return (
    <div className="w-full items-start my-10 justify-between mx-auto flex flex-col gap-20 md:flex-row p-2">
      <div className="dark:bg-gray-800 min-h-[400px] max-sm:min-h-[20px]  text-sm w-full md:w-[300px] flex flex-row md:flex-col  shadow-md rounded-sm bg-white dark:border-[#ffffff1d] p-5 max-sm:p-2 border-[#ffffff12]">
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
              user.avatar?.url || avatar
                ? user.avatar.url || avatar
                : customAvatar
            }
            alt={"profile_picture"}
            className="w-[20px] h-[20px] cursor-pointer rounded-full sm:w-[30px] sm:h-[30px]"
            width={40}
            height={40}
          />
          <div className="pl-2 dark:text-white hidden sm:block font-Poppins text-black">
            My account
          </div>
        </div>
        <div
          className={`w-full items-center py-4 px-3 cursor-pointer flex ${
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
          <h5 className="pl-2 dark:text-white hidden sm:block font-Poppins text-black">
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
          <h5 className="pl-2 dark:text-white hidden sm:block font-Poppins text-black">
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
            <h5 className="pl-2 dark:text-white hidden sm:block font-Poppins text-black">
              Admin Dashboard
            </h5>
          </Link>
        )}
        {isLoading ? (
          <div
            className={`w-full flex items-center gap-5  py-4 px-3 cursor-pointer `}
          >
            <ImSpinner className="w-6 h-6 text-black dark:text-white animate-spin" />
            <span className="font-light dark:text-white text-black text-sm font-Poppins hidden sm:block">
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
            <h5 className="pl-2 dark:text-white hidden sm:block font-Poppins text-black">
              Log out
            </h5>
          </div>
        )}
      </div>

      <div className="rounded-sm dark:bg-gray-800 mx-auto bg-white shadow-md w-full md:w-[900px] dark:border-[#ffffff1d] p-5 border-[#ffffff12] mt-4 md:mt-0 md:ml-4">
        <div>
          {isActive === 1 && (
            <div>
              <UserProfileInfo user={user} avatar={avatar} />
            </div>
          )}
        </div>
        <div className="w-full">
          {isActive === 2 && (
            <div>
              <UserPasswordInfo user={user} />
            </div>
          )}
        </div>
        <div className="w-full">
          {isActive === 3 && (
            <div className="w-full">
              <div className="w-full mx-auto grid grid-cols-1 gap-5 max-sm:gap-0 sm:grid-cols-2 md:grid-cols-3">
                {courses &&
                  courses.length > 0 &&
                  courses.map((item: any) => (
                    <CoursesCard
                      items={item}
                      key={item._id}
                      isProfile={!user || !isPurchased}
                    />
                  ))}
                {courses.length === 0 && (
                  <div className="w-full col-span-1 sm:col-span-2 md:col-span-3 flex items-center justify-center">
                    <h1 className="text-xl font-Poppins text-black dark:text-white">
                      No Courses Found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
