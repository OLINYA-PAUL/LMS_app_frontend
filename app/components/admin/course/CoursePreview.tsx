import React from "react";
import CoursePlayer from "../../../../utils/CoursePlayer";
import Rating from "../../../../utils/Rating";
import { styles } from "@/app/styles/style";
import { Benne } from "next/font/google";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
  isLoading: boolean;
}

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isLoading,
}: CoursePreviewProps) => {
  const coursePercentange =
    courseData.price - (courseData.estimatedPrice / courseData.price) * 100;

  const courseContentPercentange = coursePercentange ? coursePercentange : 0;

  const prev = () => {
    setActive(active - 1);
  };

  const handleSubmitCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] px-20 max-sm:px-0 mt-10">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoID={courseData.demoUrl}
            title={courseData.courseData?.[0].title}
          />

          <div className="w-full flex items-center font-bold mt-10">
            <h1
              className={` ${
                courseData.estimatedPrice && courseData.estimatedPrice > 0
                  ? "line-through"
                  : ""
              } text-xl`}
            >
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
          <div className="w-full mt-auto text-sm font-Poppins">
            <p className="pbl-1">. Source Code Included</p>
            <p className="pbl-1">. Full liftime Access</p>
            <p className="pbl-1">. Certificate of Completion</p>
            <p className="pbl-1">. Premium Supports</p>
          </div>
          <div className="mt-5 flex items-center justify-between max-sm:flex-wrap md:flex-nowrap ">
            <div className="flex items-center gap-5 text-sm max-sm:flex-wrap md:flex-nowrap">
              <Rating rating={5} />
              <h5>0 Reviews</h5>
            </div>
            <h5 className="max-sm:pt-2">0 Students</h5>
          </div>
          <h1 className="text-[30px] font-Poppins mt-5 font-bold">
            What you will learn from this course
          </h1>
          <div className="w-full mt-5">
            {courseData.benefits.map((items) => (
              <div className="w-full flex md:items-center gap-5 ">
                <div className="w-[15px] mr-1g ap-5 ">
                  <IoMdCheckmarkCircleOutline size={20} className="mt-3" />
                </div>
                <p className="pl-2 text-sm">{items.title}</p>
              </div>
            ))}
          </div>
          <h1 className="text-[30px] font-Poppins mt-5 font-bold">
            What are the prerequisites for starting this course
          </h1>
          <div className="w-full mt-5">
            {courseData.prerequisites.map((items) => (
              <div className="w-full flex md:items-center gap-5 ">
                <div className="w-[15px] mr-1g ap-5 ">
                  <IoMdCheckmarkCircleOutline size={20} className="mt-3" />
                </div>
                <p className="pl-2 text-sm">{items.title}</p>
              </div>
            ))}
          </div>
          <div className="w-full mt-5">
            <h1 className="font-Poppins text-[25px] ">Course Details</h1>
            <div className="w-full mt-auto">
              <p className="text-sm">{courseData.description}</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between mt-10">
            <button
              className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
              onClick={prev}
            >
              Prev
            </button>

            <button
              className="py-2 px-10 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
               hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
              onClick={handleSubmitCourse}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />{" "}
                  <span>Uploading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
