import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-[95%] mx-auto mt-20 mb-10 text-sm">
      <footer>
        <div className="border border-[#000000] dark:border-[#ffffff1e]" />
        <br />
        <div className="w-[95%]  mx-auto px-1 ">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href=""
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Call Us: 1-885-665-2022
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Address: 7011 Vermont Ave, Los Angeles, CA 90044
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Mail Us: hello@elearning.com
              </p>
            </div>
          </div>

          <br />
          <p className="text-center text-black dark:text-white">
            Copyright © 2023 ELearning | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
