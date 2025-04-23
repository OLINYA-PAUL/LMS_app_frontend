"use client";

import { HeaderSEO } from "@/utils/headerSEO";
import React, { useState } from "react";
import Header from "../header";
import { useGetCourseContentDataQuery } from "@/radux/features/course/course";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "../CourseDetails/CourseContentList";
import { ref } from "yup";

const CourseContent = ({ id, user }: { id: string; user: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [route, setRoute] = useState<string>("Login");

  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentDataQuery({ id });

  const data = contentData?.courseContent;

  const [activeVideo, setActiveVideo] = useState(0);
  const courseData = contentData?.courseContent.courseData ?? [];

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />
        </div>
      ) : (
        <div className="w-full">
          <HeaderSEO
            title={data?.courseData?.[activeVideo]?.title || "Default Title"}
            description={
              data?.courseData?.[activeVideo]?.description ||
              "Default Description"
            }
            keyWords={
              data?.courseData?.[activeVideo]?.tags || "Default Keywords"
            }
          />
          <Header
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />

          {/* Responsive grid with adjusted column widths */}
          <div className="grid grid-cols-1 md:grid-cols-12 w-full">
            {/* Media section - full width on mobile, 7 cols on larger screens */}
            <div className="col-span-1 md:col-span-7 lg:col-span-8 w-full">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>

            {/* Course content list - full width on mobile, wider sidebar on larger screens */}
            <div className="col-span-1 md:col-span-5 lg:col-span-4 w-full  md:h-screen md:sticky md:top-0 md:right-0 md:z-30 overflow-y-auto">
              <CourseContentList
                data={courseData}
                isDemo={false}
                activeVideo={activeItem}
                setActiveVideo={setActiveItem}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
