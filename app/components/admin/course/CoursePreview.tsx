import React from "react";
import CoursePlayer from "../../../../utils/CoursePlayer";

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

interface CoursePreviewProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  courseData: CourseDatas;
  handleCourseCreate: () => void;
}

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}: CoursePreviewProps) => {
  return (
    <div className="w-[90%] px-20 max-sm:px-0 mt-10">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoID={courseData.demoUrl}
            title={courseData.courseData?.[0].title}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
