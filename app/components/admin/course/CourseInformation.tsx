import React, { SetStateAction } from "react";

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

interface courseInfoProps {
  active: number;
  setActive: React.Dispatch<SetStateAction<number>>;
  courseInfo: CourseInfo;
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInfo>>;
}

const CourseInformation = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}: courseInfoProps) => {
  return <div className="w-[90%] ">CourseInformation</div>;
};

export default CourseInformation;
