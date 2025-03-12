//@ts-nocheck

"use client";

import React from "react";
import CreateCourses from "@/app/components/admin/course/CreateCourses";

const CreateCourse = () => {
  return (
    <div className="w-full">
      <CreateCourses isCreating={true} />
    </div>
  );
};

export default CreateCourse;
