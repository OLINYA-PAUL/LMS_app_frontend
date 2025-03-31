import Ratings from "@/utils/Rating";
import Link from "next/link";
import { AiOutlineOrderedList } from "react-icons/ai";

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface CourseContent {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  link: Array<{ title: string; url: string }>;
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
  purchased?: number;
}

interface courseCardProps {
  items: CourseDatas;
  key: number;
  isProfile?: boolean;
}

const CoursesCard = ({ items, key, isProfile }: courseCardProps) => {
  return (
    <div className="w-full" key={items?._id}>
      <Link
        href={`${
          isProfile ? `course/${items._id}` : `course-access/${items._id}`
        }`}
      >
        <div className="mt-5 w-full h-auto rounded-lg bg-white dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] shadow-sm dark:shadow-inner overflow-hidden">
          <img
            src={items.thumbnails.url}
            alt="course_image"
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h1 className="font-Poppins text-lg font-semibold text-black dark:text-white mb-3 line-clamp-2">
              {items.name}
            </h1>

            <div className="flex items-center justify-between mb-3">
              <Ratings rating={5} />
              {!isProfile && (
                <div className="text-sm text-black dark:text-white">
                  {items.purchased} Students
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 border-t border-gray-100 dark:border-gray-700 pt-3">
              <div className="flex items-center">
                <span className="text-lg font-medium text-black dark:text-white">
                  {items.price === 0 ? "Free" : `$${items.price}`}
                </span>
                {items.estimatedPrice > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${items.estimatedPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <AiOutlineOrderedList
                  className="text-black dark:text-white"
                  size={18}
                />
                <span className="ml-2 text-sm text-black dark:text-white">
                  {items.courseData?.length || 0} Lectures
                </span>
              </div>
              <div className="flex items-center">
                <AiOutlineOrderedList
                  className="text-black dark:text-white"
                  size={18}
                />
                <span className="ml-2 text-sm text-black dark:text-white">
                  {items.courseData?.length || 0} Lectures
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoursesCard;
