"use client";

import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseSection from "./CourseData";
import CourseContentData from "./CourseContentData";
import CoursePreview from "./CoursePreview";
import {
  useCreateCoureMutation,
  useUpdateCourseMutation,
} from "../../../../radux/features/course/course";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
// Define types for the state variables
interface CourseInfo {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: string;
}

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
  videoLength: string;
  link: Link[];
  suggestion: string;
}

export interface CourseDatas {
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

interface CourseEditProps {
  courseId: string;
  isEditing: boolean;
  data?: any;
  isLoading?: boolean;
  error?: any;
  refetch?: () => void;
  isCreating: boolean;
}

const CreateCourse = ({
  courseId,
  isEditing,
  data: x,
  isLoading: loading,
  error: err,
  refetch,
  isCreating,
}: CourseEditProps) => {
  const [createCoure, { data, error, isLoading, isSuccess }] =
    useCreateCoureMutation();

  const [
    updateCourse,
    {
      data: editData,
      error: editError,
      isLoading: editLoading,
      isSuccess: editSuccess,
    },
  ] = useUpdateCourseMutation();

  const editedCourseData = x?.courses?.find(
    (items: any) => items._id === courseId
  );

  console.log("find Course data", { editedCourseData });

  const [active, setActive] = useState<number>(0);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    categories: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnails: "",
  });

  const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { title: "" },
  ]);

  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      link: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<CourseDatas>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnails: "",
    benefits: [],
    prerequiste: [],
    courseData: [],
  });

  // Initialize form with existing data when in edit mode
  useEffect(() => {
    if (editedCourseData && isEditing) {
      // Update courseInfo state
      setCourseInfo({
        name: editedCourseData.name || "",
        description: editedCourseData.description || "",
        categories: editedCourseData.categories || "",
        price: editedCourseData.price || 0,
        estimatedPrice: editedCourseData.estimatedPrice || 0,
        tags: editedCourseData.tags || "",
        level: editedCourseData.level || "",
        demoUrl: editedCourseData.demoUrl || "",
        thumbnails: editedCourseData.thumbnails?.url || "",
      });

      // Update benefits state - ensure it's an array with at least one item
      if (editedCourseData.benefits && editedCourseData.benefits.length > 0) {
        setBenefits(editedCourseData.benefits);
      }

      // Update prerequisites state - ensure it's an array with at least one item
      if (
        editedCourseData.prerequiste &&
        editedCourseData.prerequiste.length > 0
      ) {
        setPrerequisites(editedCourseData.prerequiste);
      }

      // Update courseContentData state - ensure it's an array with at least one item
      if (
        editedCourseData.courseData &&
        editedCourseData.courseData.length > 0
      ) {
        setCourseContentData(editedCourseData.courseData);
      }
    }
  }, [editedCourseData, isEditing]);

  useEffect(() => {
    if (isEditing && isEditing === true) {
      if (editSuccess) {
        const message = editData?.message || "Course Updated";
        toast?.success(message);

        redirect("/admin/courses");
      }
      if (editError) {
        if ("data" in editError) {
          const errorData = (error as any) || "failed to Update Course";
          toast?.success(errorData.data.error);
        }
      }
    }

    if (isCreating) {
      if (isSuccess) {
        const message = data?.message || "Course Created";
        toast?.success(message);

        redirect("/admin/courses");
      }
      if (error) {
        if ("data" in error) {
          const errorData = (error as any) || "failed to Create Course";
          toast?.success(errorData.data.error);
        }
      }
    }
  }, [isSuccess, error, editError, editSuccess, editData, data]);

  const handleSubmit = () => {};

  const formattedBenefits =
    benefits &&
    benefits?.map((item) => ({
      title: item.title,
    }));
  const formattedPrerequisites =
    prerequisites &&
    prerequisites?.map((item) => ({
      title: item.title,
    }));

  const formattedCourseContentData =
    courseContentData &&
    courseContentData?.map((item) => ({
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
      videoSection: item.videoSection,
      videoLength: item.videoLength,
      link: item.link?.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: item.suggestion,
    }));

  // Update courseData whenever any dependencies change
  useEffect(() => {
    setCourseData({
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnails: courseInfo.thumbnails,
      benefits: formattedBenefits,
      prerequiste: formattedPrerequisites,
      courseData: formattedCourseContentData,
    });
  }, [courseContentData, courseInfo, benefits, prerequisites]);

  const handleCourseCreate = async () => {
    if (isEditing) {
      const data = { ...courseData };
      const id = courseId;
      await updateCourse({ id, data });
    }

    if (isCreating) {
      const data = courseData;
      await createCoure(data);
    }
  };

  console.log(
    "courseContentData",
    courseData,
    courseData?.courseData?.[0]?.videoLength
  );

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[90%] max-sm:w-[100%] ">
        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseSection
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequites={prerequisites}
            setPrerequites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContentData
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isLoading={isLoading}
            isEditing={isEditing}
            isCreating={isCreating}
            editLoading={editLoading}
          />
        )}
      </div>
      <div className="w-[15%] mt-[100px] h-screen fixed top-5 right-0 hidden md:flex">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
