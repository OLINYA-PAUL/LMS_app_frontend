"use client";
import NavItems from "@/utils/navItems";
import ThemeSwitcher from "@/utils/themeSwitcher";
import { CgProfile } from "react-icons/cg";
import { LuMenuSquare } from "react-icons/lu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomeModel from "../../utils/customeModel";
import Signup from "./auth/signup";
import Verification from "./auth/Verification";
import { useSelector } from "react-redux";
import { useSocialAuthMutation } from "@/radux/features/auth/authApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Login from "./auth/Login";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";

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
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery({ refetchOnMountOrArgChange: true });

  const { data } = useSession();

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!userData && data && !hasAuthenticated) {
      socialAuth({
        email: data.user?.email as string,
        name: data.user?.name as string,
        avatar: data.user?.image as string,
      });
      setHasAuthenticated(true);
    }

    if (isSuccess && !hasAuthenticated) {
      toast.success("Login successful!");
    }
  }, [data, userData, socialAuth, isSuccess, hasAuthenticated]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setIsMobile(false);
    }
  };

  const defaultAvatar =
    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1339.jpg?w=740";

  return (
    <div className="w-full relative">
      <div className={active ? "nav_light_mode" : "nav_dark_mode"}>
        <div className="w-full m-auto h-full p-2">
          <div className="w-full flex-1 flex justify-between items-center h-auto p-3">
            <div>
              <Link href="/" className="link">
                Elearning
              </Link>
            </div>

            <div className="justify-center items-center flex cursor-pointer">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* Mobile menu toggle */}
              <div className="800px:hidden">
                <h1
                  className="font-bold text-xl ml-3"
                  onClick={() => setIsMobile(true)}
                >
                  <LuMenuSquare className="dark:text-white text-black" />
                </h1>
              </div>

              {/* Desktop profile */}
              <div className="">
                <h1 className="font-bold text-xl ml-3">
                  {userData?.user ? (
                    <Link href="/profile">
                      <img
                        src={
                          userData?.user?.avatar?.url ||
                          data?.user?.image ||
                          defaultAvatar
                        }
                        alt="user_profile"
                        width={30}
                        height={30}
                        className={`rounded-full ${
                          activeItem === 5
                            ? "border-[3px] border-green-500"
                            : ""
                        }`}
                        loading="lazy"
                      />
                    </Link>
                  ) : (
                    <CgProfile
                      className="dark:text-white text-black"
                      onClick={() => setIsOpen(true)}
                    />
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {isMobile && (
          <div
            className="moble_sidebar 800px:hidden"
            onClick={handleClose}
            id="screen"
          >
            <div className="moble_profile">
              <div className="text-center mt-5">
                <Link
                  href="/"
                  className="font-Poppins text-[20px] font-extrabold"
                >
                  Elearning
                </Link>
              </div>

              <div className="flex flex-col items-center mt-6 mb-3">
                {userData?.user || data?.user ? (
                  <Link href="/profile">
                    <img
                      src={
                        userData?.user?.avatar?.url ||
                        data?.user?.image ||
                        defaultAvatar
                      }
                      alt="mobile_user"
                      width={60}
                      height={60}
                      className="rounded-full border-[2px] border-green-500"
                      loading="lazy"
                    />
                  </Link>
                ) : (
                  <CgProfile
                    className="text-3xl text-gray-700 dark:text-white cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  />
                )}
              </div>

              <NavItems activeItem={activeItem} isMobile={true} />

              <p className="mt-[250px] text-sm text-center">
                Copyright © React prodigy {new Date().getFullYear()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Auth modals */}
      {route === "Login" && isOpen && (
        <CustomeModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
          Component={Login}
          refetch={refetch}
        />
      )}

      {route === "Sign-up" && isOpen && (
        <CustomeModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
          Component={Signup}
        />
      )}

      {route === "Verification" && isOpen && (
        <CustomeModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
          Component={Verification}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Header;
