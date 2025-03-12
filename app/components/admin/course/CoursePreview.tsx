
import React from "react";
import CoursePlayer from "../../../../utils/CoursePlayer";
import Rating from "../../../../utils/Rating";
import { styles } from "@/app/styles/style";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Keeping all original interface names
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
  link: Link[];
  suggestion: string;
}

// Preserving the original name "CourseDatas" as requested
interface CourseDatas {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: string;
  benefits: Benefit[];
  prerequiste: Prerequisite[];
  courseData: CourseContent[];
}

interface CoursePreviewProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  courseData: CourseDatas;
  handleCourseCreate: () => void;
  isLoading: boolean;
  editLoading: boolean;
  isEditing: boolean;
  isCreating: boolean;
}

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isLoading,
  isEditing,
  editLoading,
  isCreating,
}: CoursePreviewProps) => {
  // Calculate discount percentage only if valid values exist
  const coursePercentage =
    courseData.estimatedPrice > 0
      ? ((courseData.estimatedPrice - courseData.price) / courseData.estimatedPrice) * 100
      : 0;

  // Keeping original function name
  const prev = () => {
    setActive(active - 1);
  };

  // Keeping original function
  const handleSubmitCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[100%] px-10 max-sm:px-3 mt-auto">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoID={courseData.demoUrl}
            title={courseData?.courseData?.[0]?.title}
          />

          <div className="w-full flex items-center font-bold mt-10">
            <h1
              className={`text-xl ${courseData.estimatedPrice && courseData.estimatedPrice > 0 ? "line-through" : ""}`}
            >
              {courseData.price === 0 ? "Free" : `${courseData.price}$`}
            </h1>
            {courseData.estimatedPrice > 0 && (
              <>
                <h5 className="pl-3 text-sm opacity-80 line-through">
                  {courseData.estimatedPrice}$
                </h5>
                <h5 className="pl-3 text-sm">
                  {coursePercentage.toFixed(0)}% Off
                </h5>
              </>
            )}
          </div>

          <div className="flex items-center mt-3">
            <div
              className="!bg-[crimson] font-Poppins cursor-not-allowed px-5 py-2 rounded-full text-white hover:shadow-lg transition-all duration-300"
            >
              {courseData.price === 0 ? "Free" : `Buy now ${courseData.price}$`}
            </div>
          </div>

          <div className="flex items-center w-full justify-between gap-2 mt-4 max-sm:flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Enter coupon code"
              className={`${styles.input} xl:!w-[50%] md:!w-[60%] sm:!w-[70%] max-sm:w-full`}
            />
            <div className="!bg-[blue]/40 font-Poppins cursor-not-allowed px-5 py-2 rounded-full text-white max-sm:w-full max-sm:text-center">
              Apply
            </div>
          </div>

          <div className="w-full mt-6 text-sm font-Poppins space-y-1.5">
            <p className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-green-600" />
              Source Code Included
            </p>
            <p className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-green-600" />
              Full Lifetime Access
            </p>
            <p className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-green-600" />
              Certificate of Completion
            </p>
            <p className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-green-600" />
              Premium Support
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between max-sm:flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-5 text-sm max-sm:flex-wrap md:flex-nowrap">
              <Rating rating={5} />
              <h5>0 Reviews</h5>
            </div>
            <h5 className="max-sm:pt-2">0 Students</h5>
          </div>

          <h1 className="text-[20px] font-Poppins mt-5 font-bold">
            What you will learn from this course
          </h1>
          <div className="w-full mt-5 space-y-3">
            {courseData?.benefits?.map((item, index) => (
              <div className="w-full flex items-start gap-3" key={index}>
                <IoMdCheckmarkCircleOutline size={20} className="text-blue-600 mt-1" />
                <p className="pl-2 text-sm">{item.title}</p>
              </div>
            ))}
          </div>

          <h1 className="text-[20px] font-Poppins mt-5 font-bold">
            Prerequisites for this course
          </h1>
          <div className="w-full mt-5 space-y-3">
            {courseData?.prerequiste?.map((item, index) => (
              <div className="w-full flex items-start gap-3" key={index}>
                <IoMdCheckmarkCircleOutline size={20} className="text-blue-600 mt-1" />
                <p className="pl-2 text-sm">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="w-full mt-5">
            <h1 className="font-Poppins text-[15px] font-bold">Course Details</h1>
            <p className="text-sm mt-2 leading-relaxed">{courseData.description}</p>
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
                hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 flex items-center justify-center"
              onClick={handleSubmitCourse}
              disabled={isLoading || editLoading} // Prevent multiple submissions
            >
              {isLoading || editLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>{isCreating ? "Creating..." : "Updating..."}</span>
                </>
              ) : (
                <>{isCreating ? "Create" : "Update"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;