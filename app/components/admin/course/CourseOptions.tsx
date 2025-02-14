import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface CourseOptionsProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const CourseOptions = ({ active, setActive }: CourseOptionsProps) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="w-full">
      {options.map((option: string, index: number) => (
        <div
          key={option}
          className="flex w-full items-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer p-2"
          onClick={() => setActive(index)}
        >
          {/* Step indicator column */}
          <div className="flex flex-col items-center mr-3 relative">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                active >= index ? "bg-blue-500" : "bg-[#384766]"
              } transition-colors duration-200`}
            >
              {active > index ? (
                <IoMdCheckmark className="text-white text-sm" />
              ) : (
                <span className="text-white text-sm font-medium">
                  {index + 1}
                </span>
              )}
            </div>
            {index !== options.length - 1 && (
              <div
                className={`w-1 h-6 ${
                  active > index ? "bg-blue-500" : "bg-[#384766]"
                } absolute top-7`}
              />
            )}
          </div>

          {/* Step label */}
          <h5
            className={`text-base ${
              active >= index
                ? "text-black dark:text-white font-semibold"
                : "text-gray-600 dark:text-gray-400"
            } transition-colors duration-200 `}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
