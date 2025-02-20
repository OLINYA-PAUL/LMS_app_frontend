"use client";

import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContentData from "./CourseContentData";

// Define types for the state variables
interface CourseInfo {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
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

interface CourseDatas {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  benefits: Benefit[];
  prerequisites: Prerequisite[];
  courseData: CourseContent[];
}

const CreateCourse = () => {
  const [active, setActive] = useState<number>(0);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { title: "" },
  ]);

  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<CourseDatas>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
    benefits: [],
    prerequisites: [],
    courseData: [],
  });

  const handleSubmit = () => {};

  useEffect(() => {
    const formattedBenefits = benefits.map((item) => ({
      title: item.title,
    }));
    const formattedPrerequisites = prerequisites.map((item) => ({
      title: item.title,
    }));

    const formattedCourseContentData = courseContentData.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      links: item.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: item.suggestion,
    }));

    const {
      name,
      description,
      price,
      estimatedPrice,
      tags,
      level,
      demoUrl,
      thumbnail,
    } = courseInfo;

    setCourseData({
      name,
      description,
      price,
      estimatedPrice,
      tags,
      level,
      demoUrl,
      thumbnail,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    });
  }, [courseContentData, courseInfo, benefits, prerequisites]);

  console.log("all data", courseData);

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
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequites={prerequisites}
            setPrerequites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContentData
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
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
