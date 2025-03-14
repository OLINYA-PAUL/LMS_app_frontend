import { useGetHeroDataQuery } from "@/radux/features/layout/layoutApi";
import React from "react";

const HeroBanner = () => {
  const { data, isLoading } = useGetHeroDataQuery(
    { type: "Banner" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Loading state
  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
      </div>
    );
  }

  const bannerData = data?.layout?.banner || {};
  const {
    image = { url: "/assets/online_learning_lms_app.jpg" },
    title = "Unlock Your Potential with Expert-Led, World-Class Courses — Anytime, Anywhere.",
    subTitle = "We have 40k+ Online courses & 500K+ Online registered students. Find your desired courses from them.",
  } = bannerData;

  return (
    <div className="text-white min-h-screen flex items-center px-6">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center mx-auto gap-2">
        {/* Illustration Section */}
        <div className="mx-auto p-3 flex justify-center md:justify-start w-full hero_animation h-[80vh] max-h-[90vh]">
          {image?.url ? (
            <img
              src={image.url}
              alt="Course Illustration"
              width={500}
              height={500}
              className="w-full md:w-full max-w-md rounded-full object-cover text-center ml-5 "
            />
          ) : (
            <div className="w-full md:w-full max-w-md rounded-full bg-gray-300 h-full" />
          )}
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-full md:pl-12">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-black dark:text-white">
            {title}
          </h1>
          <p className="text-black dark:text-white text-base md:text-lg mt-4">
            {subTitle}
          </p>

          {/* Search Bar */}
          <div className="flex items-center mt-6">
            <input
              type="text"
              placeholder="Search Courses..."
              className="w-full p-3 rounded-l-lg dark:text-white bg-slate-900 text-white focus:outline-none"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg transition-colors"
              aria-label="Search courses"
            >
              🔍
            </button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-6">
            <div className="bg-black text-white p-4 rounded-md">
              <div className="container mx-auto py-2">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  {/* Avatar stack */}
                  <div className="flex -space-x-1.5 sm:-space-x-2 md:-space-x-3">
                    {[
                      "https://img.freepik.com/premium-photo/adult-woman-face-smile-expression-studio-portrait_53876-83921.jpg?w=740",
                      "https://img.freepik.com/free-photo/close-up-childish-african-student-male-with-funky-hair-blowing-his-cheeks_273609-14065.jpg?t=st=1732232951~exp=1732236551~hmac=fb46f696ce122e5e2415c66db7ad23877181bf9364978b841e9221e90a01d90e&w=740",
                      "https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677136.jpg?t=st=1732234387~exp=1732237987~hmac=d3c7082f28cec9210a10bd2e028127801b66ca14a2c06d90d39d0aca4bdcd3df&w=740",
                    ].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Avatar ${index + 1}`}
                        width={40}
                        height={40}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-black object-cover relative z-30"
                        style={{ zIndex: 30 - index * 10 }}
                      />
                    ))}
                  </div>

                  {/* Text content */}
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
  );
};

export default HeroBanner;
