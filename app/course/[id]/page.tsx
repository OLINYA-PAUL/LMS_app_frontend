import CourseDetails from "@/app/components/CourseDetails/CourseDetails";
import React, { use } from "react";

const Course = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <div className="w-full">
      <CourseDetails id={id} />
    </div>
  );
};

export default Course;
