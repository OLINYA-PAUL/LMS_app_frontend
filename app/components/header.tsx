"use client";
import NavItems from "@/utils/navItems";
import ThemeSwitcher from "@/utils/themeSwitcher";
import { CgProfile } from "react-icons/cg";
import { LuMenuSquare } from "react-icons/lu";

import Link from "next/link";
import React, { useState } from "react";
import CustomeModel from "../../utils/customeModel";
import Login from "../components/auth/Login";

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

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) setActive(true);
      else setActive(false);
    });
  }

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
                <h1
                  className="font-bold text-xl ml-3"
                  onClick={() => setIsOpen(() => true)}
                >
                  <CgProfile
                    width={300}
                    className="dark:text-white text-black"
                  />
                </h1>
              </div>
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
    </div>
  );
};

export default Header;
// flex items-center absolute top-[50px] left-[200px] w-[30%] h-[500px] bg-green-600
