//@ts-nocheck

"use client";

import { useParams } from "next/navigation";
import React, { use } from "react";
import CreateCourses from "@/app/components/admin/course/CreateCourses";
import { useGetAllCoursesQuery } from "@/radux/features/course/course";

const EditCourse = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // Unwrap the promise

  const { data, isLoading, error, refetch } = useGetAllCoursesQuery({});

  console.log("data in editcourse", data);

  return (
    <div className="w-full">
      <CreateCourses
        courseId={id}
        isEditing={true}
        data={data}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default EditCourse;
