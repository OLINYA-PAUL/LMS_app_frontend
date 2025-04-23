"use client";
import CourseContent from "@/app/components/Courses/CourseContent";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { isErrored } from "stream";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { data, error, isLoading } = useLoadUserQuery({});

  const router = useRouter();

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (course: any) => course._id === id
      );

      if (!isPurchased) {
        return router.push("/");
      }
      if (error) {
        return router.push("/");
      }
    }
  }, [data, error]);

  return (
    <div className="w-full mt-5">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
        </div>
      ) : (
        <div className="w-full">
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </div>
  );
};

export default page;
