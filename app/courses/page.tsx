"use client";

import {
  useGetCourseContentDetailsQuery,
  useGetUserAllCoursesQuery,
} from "@/radux/features/course/course";
import { HeaderSEO } from "@/utils/headerSEO";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/Footer/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetHeroDataQuery } from "@/radux/features/layout/layoutApi";
import { Frown, SearchX } from "lucide-react";
import CoursesCard from "../components/CourseDetails/CoursesCard";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "@/radux/features/user/userApiSlice";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";

const Courses = () => {
  const [route, setRoute] = useState("Login");
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  let searchTitle = searchParams?.get("title") || "";
  const [courses, setCourse] = useState<any[]>([]);
  const [categories, setCategories] = useState("All");

  const { data, isLoading } = useGetUserAllCoursesQuery({});
  const { data: categoriesData } = useGetHeroDataQuery({ type: "Categories" });

  const category = categoriesData?.layout?.categories || [];

  console.log(category);

  // const { user } = useSelector((state: any) => state.auth);
  const { data: user } = useLoadUserQuery({});

  console.log("User data:", user);
  const isPurchased = user?.courses?.some((c: any) => {
    return c._id === data?.courses?._id;
  });

  // useEffect(() => {
  //   if (!data?.courses) return;

  //   let filteredCourses = [...data.courses];

  //   if (categories !== "All") {
  //     filteredCourses = filteredCourses.filter(
  //       (item: any) => item.categories === categories
  //     );
  //   }

  //   if (searchTitle) {
  //     filteredCourses = filteredCourses.filter((item: any, index: number) => {
  //       item.courseData[index]?.title
  //         .toLowerCase()
  //         .includes(searchTitle.toLowerCase()) ??
  //         category.map((items: any, index: number) => {
  //           console.log("item name categories:", { items });
  //           items?.title.toLowerCase().includes(searchTitle.toLowerCase());
  //         });
  //     });

  //     console.log("Filtered courses:", filteredCourses);
  //   }

  //   //@ts-ignore
  //   setCourse(filteredCourses);
  // }, [data, categories, searchTitle]);

  useEffect(() => {
    if (!data?.courses) return;

    let filteredCourses = [...data.courses];

    console.log("Original courses:", filteredCourses);
    console.log("Search title:", searchTitle);

    // Filter by category
    if (categories !== "All") {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.categories === categories
      );
      console.log("After category filter:", filteredCourses);
    }

    if (categories !== "All") {
      searchTitle = categories;
      console.log("Search title after category:", searchTitle);
    }

    // Filter by search title - case insensitive
    if (searchTitle && searchTitle.trim() !== "") {
      const searchLower = searchTitle.toLowerCase();

      filteredCourses = filteredCourses.filter((item: any) => {
        if (item.title && item.title.toLowerCase().includes(searchLower)) {
          console.log("Match found in title", item);
          return true;
        }

        // Check categories
        if (
          item.categories &&
          item.categories.toLowerCase().includes(searchLower)
        ) {
          console.log("Match found in categories");
          return true;
        }

        return false;
      });

      console.log("After search filter:", filteredCourses);
    }

    // Set filtered courses
    setCourse(filteredCourses);
  }, [data, categories, searchTitle]);

  return (
    <div className="w-[95%] mx-auto mt-5">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />
        </div>
      ) : (
        <div className="w-full">
          <HeaderSEO
            title={courses ? `${courses[0]?.name} - Elearning` : "Elearning"}
            description="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
            keyWords="Nextjs, React, Javascript, Radux MERN"
          />
          <Header
            activeItem={1}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            route={route}
            setRoute={setRoute}
          />

          {/* Your course listing or UI here using `course` */}
          <div className="w-full my-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:justify-center">
              {/* "All" Button */}
              <button
                onClick={() => setCategories("All")}
                className={`${
                  categories === "All" ? "bg-[crimson]" : "bg-blue-800"
                } px-6 py-1 outline-none border-0 rounded-full shadow-md text-white`}
              >
                All
              </button>

              {/* Category Buttons */}
              {category &&
                category.map((item: any, index: number) => (
                  <button
                    key={item._id ?? index}
                    onClick={() => setCategories(item.title)}
                    className={`${
                      categories === item.title ? "bg-[crimson]" : "bg-blue-800"
                    } px-4 py-1 outline-none border-0 rounded-full shadow-md text-white`}
                  >
                    {item.title}
                  </button>
                ))}
            </div>

            <div className="w-full mt-5">
              {courses && courses.length === 0 && (
                <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-4 text-gray-400 space-y-4">
                  <div className="text-5xl text-red-500 animate-bounce">
                    {searchTitle ? <SearchX /> : <Frown />}
                  </div>
                  <h2 className="text-2xl font-semibold">
                    {searchTitle
                      ? "No course found!"
                      : "Oops! Nothing in this category."}
                  </h2>
                  <p className="text-sm max-w-md">
                    {searchTitle
                      ? "We couldn't find a course matching your search. Please try a different keyword."
                      : "There are currently no courses under this category. Try exploring others."}
                  </p>
                </div>
              )}
            </div>

            <div className="w-full mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {courses &&
                courses.length > 0 &&
                courses.map((item: any) => (
                  <>
                    <CoursesCard
                      items={item}
                      key={item._id}
                      isProfile={!user || !isPurchased}
                    />
                  </>
                ))}
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default Courses;
