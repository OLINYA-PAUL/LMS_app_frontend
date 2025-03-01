import React from "react";
import CoursePlayer from "../../../../utils/CoursePlayer";
import Rating from "../../../../utils/Rating";
import { styles } from "@/app/styles/style";

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
  const coursePercentange =
    courseData.price - (courseData.estimatedPrice / courseData.price) * 100;

  const courseContentPercentange = coursePercentange ? coursePercentange : 0;

  return (
    <div className="w-[90%] px-20 max-sm:px-0 mt-10">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoID={courseData.demoUrl}
            title={courseData.courseData?.[0].title}
          />

          <div className="w-full flex items-center font-bold mt-10">
            <h1 className=" text-xl">
              {courseData.price === 0 ? "Free" : courseData.price + "$"}
            </h1>
            <h5 className="pl-3  pb-3 opacity-80 line-through text-sm">
              {courseData.estimatedPrice + "$"}
            </h5>
            <h5 className="pl-3 text-sm">
              {courseContentPercentange.toFixed(0) + "% Off"}
            </h5>
          </div>
          <div className="flex items-center">
            <div
              className={`${""} !bg-[crimson] font-Poppins cursor-not-allowed my-3 px-5 py-2 rounded-full text-white`}
              onClick={() => "Buy now"}
            >
              {courseData.price === 0
                ? "Free"
                : ` Buy now ${courseData.price}` + "$"}
            </div>
          </div>
          <div className="flex items-center w-full justify-between max-sm:flex-wrap md:flex-nowrap">
            <input
              type="text"
              className={`${styles.input} xl:!w-[50%] md:!w-[60%] sm:!w-[70%]`}
              onChange={() => ""}
            />
            <div
              className={`${""} !bg-[blue]/40 font-Poppins cursor-not-allowed my-3 px-5 py-2 rounded-full text-white`}
              onClick={() => "Buy now"}
            >
              Apply
            </div>
          </div>
          <div className="w-full mt-auto">
            <p className="pbl-1">. Source Code Included</p>
            <p className="pbl-1">. Full liftime Access</p>
            <p className="pbl-1">. Certificate of Completion</p>
            <p className="pbl-1">. Premium Supports</p>
          </div>
          <div className="mt-5 flex items-center justify-between ">
            <div className="flex items-center">
              <Rating rating={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
