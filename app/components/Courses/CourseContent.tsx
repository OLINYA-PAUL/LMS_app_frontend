"use client";

import { HeaderSEO } from "@/utils/headerSEO";
import React, { useState } from "react";
import Header from "../header";
import { useGetCourseContentDataQuery } from "@/radux/features/course/course";
import CourseContentMedia from "./CourseContentMedia";

const CourseContent = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [route, setRoute] = useState<string>("Login");

  const { data: contentData, isLoading } = useGetCourseContentDataQuery({ id });

  const data = contentData?.courseContent;
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
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
          <div className="grid  mx-auto  800px:grid-cols-10 w-full">
            <div className="w-full col-span-7 ">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
