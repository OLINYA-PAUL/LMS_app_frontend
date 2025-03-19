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
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/profile_image.jpg";
import { useSocialAuthMutation } from "@/radux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { ImSpinner } from "react-icons/im";
import Login from "./auth/Login";

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

  const { user, token } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  // Optimized scroll handler with debounce
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
    if (!user && data && !hasAuthenticated) {
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
  }, [data, user, socialAuth, isSuccess, hasAuthenticated]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setIsMobile(false);
    }
  };

  // Default avatar URL
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
              <div className="hidden 800px:block">
                <h1 className="font-bold text-xl ml-3">
                  {user ? (
                    <Link href="/profile">
                      <img
                        src={
                          user?.avatar?.url ||
                          data?.user?.image ||
                          defaultAvatar
                        }
                        alt={
                          user?.profile || data?.user?.name || "user_profile"
                        }
                        width={30}
                        height={30}
                        className={`rounded-full ${
                          activeItem === 5
                            ? "border-[3px] border-green-500"
                            : ""
                        }`}
                      />
                    </Link>
                  ) : (
                    <div>
                      <CgProfile
                        className="dark:text-white text-black"
                        onClick={() => setIsOpen(true)}
                      />
                    </div>
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
              <NavItems activeItem={activeItem} isMobile={true} />
              <div className="text-xl ml-6 mt-5">
                <h1 className="font-bold" onClick={() => setIsOpen(true)}>
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

      {/* Auth modals */}
      {route === "Login" && isOpen && (
        <CustomeModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
          Component={Login}
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
        />
      )}
    </div>
  );
};

export default Header;
