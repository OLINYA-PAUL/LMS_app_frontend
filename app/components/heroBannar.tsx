"use client";
import Image from "next/image";
import React from "react";

const HeroBannar = () => {
  return (
    <div className="text-white min-h-screen flex items-center  px-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center mx-auto ">
        {/* Illustration Section */}
        <div className="flex justify-center md:justify-start w-full hero_animation">
          <Image
            src={require("../../public/assets/online_learning_lms_app.jpg")}
            alt="Illustration"
            className="w-full md:w-full max-w-md rounded-full"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-full md:pl-12 ">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-black dark:text-white">
            Unlock Your Potential with Expert-Led, World-Class Courses — Learn
            Anytime, Anywhere.{" "}
          </h1>
          <p className="text-black dark:text-white text-base md:text-lg mt-4 ">
            We have 40k+ Online courses & 500K+ Online registered students. Find
            your desired courses from them.
          </p>
          <div className="flex items-center mt-6">
            <input
              type="text"
              placeholder="Search Courses..."
              className="w-full p-3 rounded-l-lg dark:text-white bg-slate-900 text-white focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg">
              🔍
            </button>
          </div>
          <div className="text-gray-300 text-sm mt-4">
            <div className="bg-black text-white p-4 flex items-center gap-2 rounded-md">
              <div className="bg-black w-full">
                <div className="container mx-auto px-4 py-2 md:py-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    {/* Avatar stack - sizes adjust based on screen */}
                    <div className="flex -space-x-1.5 sm:-space-x-2 md:-space-x-3">
                      <img
                        src="https://img.freepik.com/premium-photo/adult-woman-face-smile-expression-studio-portrait_53876-83921.jpg?w=740"
                        alt="Avatar 3"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-black object-cover relative z-30"
                      />
                      <img
                        src="https://img.freepik.com/free-photo/close-up-childish-african-student-male-with-funky-hair-blowing-his-cheeks_273609-14065.jpg?t=st=1732232951~exp=1732236551~hmac=fb46f696ce122e5e2415c66db7ad23877181bf9364978b841e9221e90a01d90e&w=740"
                        alt="Avatar 1"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-black object-cover relative z-20"
                      />
                      <img
                        src="https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677136.jpg?t=st=1732234387~exp=1732237987~hmac=d3c7082f28cec9210a10bd2e028127801b66ca14a2c06d90d39d0aca4bdcd3df&w=740"
                        alt="Avatar 2"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-black object-cover relative z-10"
                      />
                    </div>

                    {/* Text content - responsive font sizes and layout */}
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white">
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-center sm:text-left whitespace-nowrap">
                        300K+ People already trusted us.
                      </span>
                      <a
                        href="#courses"
                        className="text-green-400 hover:text-green-300 transition-colors text-sm sm:text-base md:text-lg font-medium whitespace-nowrap"
                      >
                        View Courses
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannar;
