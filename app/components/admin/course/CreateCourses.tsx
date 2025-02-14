"use client";

import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";

// Define types for the state variables
interface CourseInfo {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
}

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
  links: Link[];
  suggestion: string;
}

interface CourseData {
  // You can define the structure based on your actual course data
}

const CreateCourse = () => {
  const [active, setActive] = useState<number>(0);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
  const [prerequites, setPrerequites] = useState<Prerequisite[]>([
    { title: "" },
  ]);

  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<CourseData>({});

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[90%] max-sm:w-[100%] ">
        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
      </div>
      <div className="w-[15%] mt-[100px] h-screen fixed top-5 right-0 hidden md:flex">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
