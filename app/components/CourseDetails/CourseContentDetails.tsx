"use client";

import CoursePlayer from "@/utils/CoursePlayer";
import Ratings from "@/utils/Rating";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface Link {
  title: string;
  url: string;
}

interface CourseContent {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  link: Link[];
  suggestion: string;
}

interface CourseData {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: string;
  benefits: Benefit[];
  prerequiste: Prerequisite[];
  courseData: CourseContent[];
  reviews: Review[];
  purchased: number;
  ratings: number;
}

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseContentDetailsProps {
  data: {
    courses: CourseData;
  };
}

const CourseContentDetails = ({ data }: CourseContentDetailsProps) => {
  const disCountPercentage = data?.courses?.estimatedPrice
    ? ((data.courses.estimatedPrice - data.courses.price) /
        data.courses.estimatedPrice) *
      100
    : 0;

  const { user } = useSelector((state: any) => state.auth);
  const isPurchased = user?.courses?.some(
    (c: any) => c._id === data?.courses._id
  );

  return (
    <div className="w-full mx-auto mt-3 font-Poppins px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
      <div className="w-full flex flex-col 800px:flex-row gap-6">
        {/* Left Content Section */}
        <div className="w-full 800px:w-[65%] 800px:pr-6">
          <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">
            {data?.courses.name}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
            <div className="flex items-center gap-2">
              <Ratings rating={Number(data?.courses?.ratings)} />
              <span className="text-black dark:text-white">
                {data?.courses?.reviews?.length || 0} Reviews
              </span>
            </div>
            <span className="text-black dark:text-white">
              {data?.courses?.purchased || 0} Students
            </span>
          </div>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              What you'll learn
            </h2>
            <ul className="list-disc pl-4 space-y-1">
              {data?.courses?.benefits?.map(
                (benefit: Benefit, index: number) => (
                  <li key={index} className="text-black dark:text-white">
                    {benefit.title}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Prerequisites
            </h2>
            <ul className="list-disc pl-4 space-y-1">
              {data?.courses?.prerequiste?.map(
                (prereq: Prerequisite, index: number) => (
                  <li key={index} className="text-black dark:text-white">
                    {prereq.title}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Course Overview
            </h2>
            <CourseContentList data={data} isDemo={true} />
          </section>
          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Course Details
            </h2>
            <p className="text-black dark:text-white leading-relaxed">
              {data?.courses.description}
            </p>
          </section>

          <section className="mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Ratings rating={Number(data?.courses?.ratings)} />
              <div className="flex flex-row gap-3">
                <span className="font-medium text-black dark:text-white">
                  {Number(data?.courses?.ratings).toFixed(1)} Course Rating
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {data?.courses?.reviews?.length || 0} Reviews
                </span>
              </div>
            </div>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-3">
              Student Reviews
            </h2>
            <div className="space-y-4">
              {data?.courses?.reviews?.map((review: Review) => (
                <div
                  key={review._id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="uppercase text-gray-700 dark:text-gray-300 text-xs">
                        {review.user.name.slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <h3 className="font-medium text-black dark:text-white">
                          {review.user.name}
                        </h3>
                        <Ratings rating={review.rating} />
                      </div>
                      <p className="mt-1 text-black dark:text-white">
                        {review.comment}
                      </p>
                      <time className="block mt-1 text-gray-500 dark:text-gray-400 text-xs">
                        {format(review.createdAt)}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="w-full 800px:w-[35%]">
          <div className="sticky top-20 space-y-4">
            <div className="aspect-w-16 aspect-h-9">
              <CoursePlayer
                videoID={data?.courses?.demoUrl}
                title={data?.courses?.title}
                isCoursePlayer={true}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {data?.courses?.estimatedPrice > 0 && (
                    <span className="line-through text-gray-500 dark:text-gray-400">
                      ${data?.courses?.estimatedPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-green-600">
                    {data?.courses?.price === 0
                      ? "Free"
                      : `$${data?.courses?.price}`}
                  </span>
                  {data?.courses?.estimatedPrice > 0 && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                      {disCountPercentage.toFixed(0)}% Off
                    </span>
                  )}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors text-white
                    ${
                      isPurchased
                        ? "bg-blue-600 hover:bg-blue-700 cursor-default"
                        : "bg-red-800 hover:bg-red-900"
                    }
                  `}
                  disabled={isPurchased}
                >
                  {isPurchased
                    ? "Purchased"
                    : data?.courses?.price === 0
                    ? "Enroll Now"
                    : `Purchase - $${data?.courses?.price}`}
                </button>

                <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  {[
                    "Source Code Included",
                    "Full Lifetime Access",
                    "Certificate of Completion",
                    "Premium Support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <IoMdCheckmarkCircleOutline className="flex-shrink-0 text-green-600 text-sm" />
                      <span className="text-black dark:text-white">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentDetails;
