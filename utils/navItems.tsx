import React from "react";
import Link from "next/link";

interface navProps {
  isMobile: boolean;
  activeItem: number;
}

const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const NavItems = ({ activeItem, isMobile }: navProps) => {
  return (
    <>
      <ul className="nav-bar">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <li
              key={index}
              className="font-Poppins  cursor-pointer p-3 font-bold"
            >
              <Link
                href={i.url}
                passHref
                className={`${
                  activeItem === index ? "active_link" : "normal_link"
                } nav_text`}
              >
                {i.name}
              </Link>
            </li>
          ))}
      </ul>
      {isMobile && (
        <ul className="800px:hidden moble_container ">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <li
                key={index}
                className="mx-5 font-Poppins  cursor-pointer moble_nav_items text-left"
              >
                <Link
                  href={`${i.url}`}
                  passHref
                  className={`${
                    activeItem === index ? "active_link" : "normal_link"
                  } mobile_nav`}
                >
                  {i.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default NavItems;
