"use client";

import { styles } from "@/app/styles/style";
import CoursePlayer from "@/utils/CoursePlayer";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
}: {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
}) => {
  console.log("CourseContentMedia data:", data.courseData[0].link[0].url); // Debugging log
  const [activeBar, setActiveBar] = React.useState(0);

  return (
    <div className="w-full 800px:w-[85%] p-5 mx-auto">
      <CoursePlayer
        title={data.courseData[activeVideo].title}
        videoID={data.courseData[activeVideo].videoUrl}
        isCoursePlayer={true}
      />
      <div className="w-full flex items-center justify-between mt-10">
        {/* Prev Lesson Button */}
        <div
          className={`${
            styles.button
          } !min-h-[40px] py-[unset] !w-[unset] !rounded-full dark:text-white opacity-[.8] flex justify-center items-center ${
            activeVideo === 0
              ? "!bg-red-600 cursor-not-allowed opacity-70"
              : "!bg-blue-700 cursor-pointer"
          }`}
          onClick={() => {
            if (activeVideo > 0) {
              setActiveVideo(activeVideo - 1);
            }
          }}
        >
          <AiOutlineLeft size={20} className="mr-3" />
          Prev Lesson
        </div>

        {/* Next Lesson Button */}
        <div
          className={`${
            styles.button
          } !min-h-[40px] py-[unset] !w-[unset] !rounded-full dark:text-white opacity-[.8] flex justify-center items-center ${
            activeVideo === data.courseData.length - 1
              ? "!bg-red-600 cursor-not-allowed opacity-70"
              : "!bg-blue-700 cursor-pointer"
          }`}
          onClick={() => {
            setActiveVideo(
              data && data.courseData.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            );
          }}
        >
          Next Lesson
          <AiOutlineRight size={20} className="ml-3" />
        </div>
      </div>
      <h1 className="text-2xl text-black dark:text-white mt-5 font-[800]">
        {data.courseData[activeVideo].title}
      </h1>
      <div className="w-full mt-[100px] p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-sm cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <div className="w-full">
        {activeBar === 0 && (
          <div className="w-full my-5 whitespace-pre-wrap text-sm">
            {" "}
            {data.courseData[activeVideo].description}
          </div>
        )}

        {activeBar === 1 && (
          <div className="w-full mt-5">
            {data.courseData[activeVideo].link.map(
              (items: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-start my-2"
                  >
                    <a
                      href={items.url}
                      target="_blank"
                      className="text-sm text-blue-500 inline-block "
                    >
                      Source Code: {items.url}
                    </a>
                  </div>
                );
              }
            )}
          </div>
        )}
        {activeBar === 2 && (
          <div className="w-full mt-5">
            {data.courseData[activeVideo].link.map(
              (items: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-start my-2"
                  >
                    <a
                      href={items.url}
                      target="_blank"
                      className="text-sm text-blue-500 inline-block "
                    >
                      Source Code: {items.url}
                    </a>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentMedia;
