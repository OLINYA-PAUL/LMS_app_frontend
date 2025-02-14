"use client";
import NavItems from "@/utils/navItems";
import ThemeSwitcher from "@/utils/themeSwitcher";
import { CgProfile } from "react-icons/cg";
import { LuMenuSquare } from "react-icons/lu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomeModel from "../../utils/customeModel";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Verification from "./auth/Verification";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/profile_image.jpg";
import { useSocialAuthMutation } from "@/radux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

import toast from "react-hot-toast";
import { ImSpinner } from "react-icons/im";
interface headerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: number;
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({
  isOpen,
  setIsOpen,
  activeItem,
  route,
  setRoute,
}: headerProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [isMobile, setisMobile] = useState<boolean>(false);

  const { user, token } = useSelector((state: any) => state.auth);
  console.log({ USER: user, TOKEN: token });
  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setActive(true);
      else setActive(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data.user?.email as string,
          name: data.user?.name as string,
          avatar: data.user?.image as string,
        });
      }
    }

    if (isSuccess) toast.success("login successfully!");
  }, [data, user]);

  const handleClose = (e: any) => {
    if (e.target?.id === "screen") {
      setisMobile(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className={`${active ? "nav_light_mode" : " nav_dark_mode"}`}>
        <div className="w-[100%] m-auto h-full p-2">
          <div className="w-full  flex-1 flex justify-between items-center h-auto p-3">
            <div>
              <Link href={`/`} className="link">
                Elearning
              </Link>
            </div>
            <div className="justify-center items-center flex cursor-pointer">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* // only for mobile */}
              <div className="800px:hidden">
                <h1
                  className="font-bold text-xl ml-3"
                  onClick={() => setisMobile(() => true)}
                >
                  <LuMenuSquare
                    width={300}
                    className="dark:text-white text-black"
                  />
                </h1>
              </div>
              <div className="hidden 800px:block">
                <h1 className="font-bold text-xl ml-3">
                  {user && user.avatar.url ? (
                    <Link href={"/profile"}>
                      <Image
                        src={user.avatar.url ? user.avatar.url : avatar}
                        alt={user?.profile || "user_profile"}
                        width={25}
                        height={25}
                        className={`rounded-full  sm:w-[80px] sm:h-[80px] md:w-[30px] md:h-[30px]  ${
                          activeItem === 5
                            ? "border-[3px] border-green-500 "
                            : ""
                        }`}
                      />
                    </Link>
                  ) : (
                    <div>
                      <CgProfile
                        width={300}
                        className="dark:text-white text-black"
                        onClick={() => setIsOpen(() => true)}
                      />
                    </div>
                  )}
                </h1>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        {isMobile && (
          <div
            className="moble_sidebar 800px:hidden"
            onClick={(e) => handleClose(e)}
            id="screen"
          >
            <div className="moble_profile">
              <div className="text-center mt-5">
                <Link
                  href={`/`}
                  className="font-Poppins text-[20px] font-extrabold"
                >
                  Elearning
                </Link>
              </div>
              <NavItems activeItem={activeItem} isMobile={true} />
              <div className="text-xl ml-6 mt-5">
                <h1
                  className="font-bold "
                  onClick={() => setIsOpen(() => true)}
                >
                  user
                </h1>
                <p className="mt-[250px] text-sm">
                  Copyright @React prodigy {new Date().getFullYear().toString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <div>
          {isOpen && (
            <div className="w-full">
              <CustomeModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
                Component={Login}
              />
            </div>
          )}
        </div>
      )}
      {route === "Sign-up" && (
        <div>
          {isOpen && (
            <div className="w-full">
              <CustomeModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
                Component={Signup}
              />
            </div>
          )}
        </div>
      )}
      {route === "Verification" && (
        <div>
          {isOpen && (
            <div className="w-full">
              <CustomeModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
                Component={Verification}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
