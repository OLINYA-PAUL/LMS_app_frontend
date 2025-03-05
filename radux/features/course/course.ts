import { CourseDatas } from "@/app/components/admin/course/CreateCourses";
import { apiSlice } from "../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoure: builder.query({
      query: (data: CourseDatas) => ({
        url: "/course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCoureQuery } = courseApi;
