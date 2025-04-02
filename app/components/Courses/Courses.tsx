"use client";

import { useGetUserAllCoursesQuery } from "@/radux/features/course/course";
import React, { useEffect, useState } from "react";
import CoursesCard from "../CourseDetails/CoursesCard";

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

interface imageDetals {
  url: string;
  public_id: string;
}

export interface CourseDatas {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: imageDetals;
  benefits: Benefit[];
  prerequiste: Prerequisite[];
  courseData: CourseContent[];
  _id: string | number;
}

const Courses = () => {
  const { data, isLoading, isSuccess } = useGetUserAllCoursesQuery({});

  const [courses, setCourses] = useState<CourseDatas[]>([]);

  const allCoureData = data ?? [];

  useEffect(() => {
    if (allCoureData) {
      setCourses(allCoureData?.courses);
    }
  }, [data, isSuccess]);

  return (
    <div className="w-full px-8 mt-5">
      {isLoading ? (
        <div>Loading courses...</div>
      ) : (
        <div className="w-full pb-10 ">
          <div className="w-full flex items-center justify-center">
            <h1 className="font-bold text-3xl font-Poppins text-center">
              Expand Your Career{" "}
              <span className="hero_animations bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
                Opportunities
              </span>{" "}
              With
              <br /> Our Expert Courses
            </h1>
          </div>
          <div className="w-full mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses && courses.length > 0 ? (
              courses.map((item: CourseDatas, index: number) => (
                <>
                  <CoursesCard items={item} key={index} isProfile={true} />
                </>
              ))
            ) : (
              <div className="col-span-full text-center">
                No courses available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
