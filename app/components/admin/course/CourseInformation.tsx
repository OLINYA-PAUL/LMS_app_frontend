import React, { SetStateAction } from "react";

interface courseInfoProps {
  active: number;
  setActive: React.Dispatch<SetStateAction<number>>;
}

const CourseInformation = ({ active, setActive }: courseInfoProps) => {
  return <div>CourseInformation</div>;
};

export default CourseInformation;
