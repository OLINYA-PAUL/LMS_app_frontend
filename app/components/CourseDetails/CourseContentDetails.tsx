"use client";

import CoursePlayer from "@/utils/CoursePlayer";
import Ratings from "@/utils/Rating";
import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

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

export interface CourseDatas {
  name: string;
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
}

const CourseContentDetails = ({ data }: { data: any }) => {
  console.log("course details", { data }, { x: data?.courses._id });

  const disCountPercentage =
    data &&
    data.courses.estimatedPrice -
      data.courses.price / data.courses.estimatedPrice;

  const { user } = useSelector((state: any) => state.auth);

  const isPurchased =
    user &&
    user?.courses?.find((c: any) => {
      return c._id === data?.courses._id;
    });

  return (
    <div className="w-full mx-auto mt-3 font-Poppins ">
      <div className="w-full flex 800px:flex-row  flex-col-reverse">
        <div className="w-full 800px:w-[65%] ">
          <h1 className="font-Poppins text-[25px] text-black dark:text-white">
            {data?.courses.name}
          </h1>
          <div className="w-full flex items-center justify-between gap-3 mt-5 ">
            <div className="flex items-center gap-3 ">
              <Ratings rating={Number(data.courses.ratings)} />
              <h5 className="text-black dark:text-white font-Poppins text-[15px]">
                {data.courses.reviews.length} Reviews
              </h5>
            </div>
            <h5 className="text-black dark:text-white font-Poppins text-[15px]">
              {data.courses.purchased} Students
            </h5>
          </div>
          <h5 className="mt-2 text-black dark:text-white font-Poppins text-[15px] font-bold">
            What you will lear from this course
          </h5>
          <div className="w-full mt-5">
            <ul className="list-disc pl-5">
              {data?.courses?.benefits.map(
                (benefit: Benefit, index: number) => (
                  <li key={index} className="text-black dark:text-white">
                    {benefit.title}
                  </li>
                )
              )}
            </ul>
          </div>
          <h5 className="mt-5 text-black dark:text-white font-Poppins text-[15px] font-bold">
            prerequiste for starting this course
          </h5>
          <div className="w-full mt-3">
            <ul className="list-disc pl-5">
              {data?.courses?.prerequiste.map(
                (prerequiste: Prerequisite, index: number) => (
                  <li
                    key={index}
                    className="text-black dark:text-white text-sm"
                  >
                    {prerequiste.title}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="mt-5 w-full">
            <h5 className="mt-2 text-black dark:text-white font-Poppins text-[15px] font-bold">
              Course Overview
            </h5>
          </div>
          <div className="w-full mt-5">
            <h5 className="mt-2 text-black dark:text-white font-Poppins text-[15px] font-bold">
              Course Description
            </h5>
            <p className="text-black dark:text-white font-Poppins text-sm mt-5 leading-loose">
              {data?.courses.description}
            </p>
          </div>
          <div className="flex items-center gap-5 w-full mt-5">
            <Ratings rating={Number(data.courses.ratings)} />
            <div className="mb-3 800px:mb-[unset]">
              <h5 className=" text-black dark:text-white font-Poppins text-[15px] font-bold">
                {Number.isInteger(data.courses.ratings)
                  ? Number(data.courses.ratings).toFixed(1)
                  : Number(data.courses.ratings).toFixed(2)}
                {"  "} Course rating ❄ {data.courses.reviews.length}
                {"  "} Reviews
              </h5>
            </div>
          </div>
          <div className="w-full mt-5">
            {data &&
              data.courses.reviews.length > 0 &&
              [...data.courses.reviews]
                .reverse()
                .map((review: any, index: number) => (
                  <div className="w-full p-4 " key={review?._id ?? index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[600px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px] text-black dark:text-white">
                            {review.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {review.user.name}
                          </h5>
                          <Ratings rating={review.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {review.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(review.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {review.user.name}
                        </h5>
                        <Ratings rating={review.rating} />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="w-[30%] 800px:w-[30%] h-[50px] mx-auto">
          <div className="sticky top-[100px]   left-0 z-50 w-full">
            <CoursePlayer
              videoID={data?.courses.demoUrl}
              title={data?.courses.title}
            />

            <div className="w-full flex items-center font-bold mt-10">
              <h1
                className={`text-xl ${
                  data?.courses.estimatedPrice &&
                  data?.courses.estimatedPrice > 0
                    ? "line-through"
                    : ""
                }`}
              >
                {data?.courses.price === 0 ? "Free" : `${data?.courses.price}$`}
              </h1>
              {data?.courses.estimatedPrice > 0 && (
                <>
                  <h5 className="pl-3 text-sm opacity-80 line-through">
                    {data?.courses.estimatedPrice}$
                  </h5>
                  <h5 className="pl-3 text-sm">
                    {data?.courses.toFixed(0)}% Off
                  </h5>
                </>
              )}

              {/* -------------- */}

              {data?.courses.estimatedPrice > 0 && (
                <>
                  <h5 className="pl-3 text-sm opacity-80 line-through">
                    {data?.courses.estimatedPrice}$
                  </h5>
                  <h5 className="pl-3 text-sm">
                    {data?.courses.toFixed(0)}% Off
                  </h5>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentDetails;
