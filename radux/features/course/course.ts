import { CourseDatas } from "@/app/components/admin/course/CreateCourses";
import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoure: builder.mutation({
      query: (data: CourseDatas) => ({
        url: "/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/getall-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCoureMutation, useGetAllCoursesQuery } = courseApi;
