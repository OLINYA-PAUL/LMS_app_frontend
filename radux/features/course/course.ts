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
        url: "/get-admin-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteUserCourse: builder.mutation({
      query: (id: String) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "/getall-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContentDetails: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `getsingle-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContentData: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `getcourse-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addCourseQuestion: builder.mutation({
      query: ({
        question,
        courseId,
        contentId,
      }: {
        question: string;
        courseId: string;
        contentId: string;
      }) => ({
        url: "addcourse-question",
        method: "PUT",
        body: {
          question,
          courseId,
          contentId,
        },
        credentials: "include" as const,
      }),
    }),
    addAnswerToQuestion: builder.mutation({
      query: ({
        answer,
        questionId,
        courseId,
        contentId,
      }: {
        answer: string;
        questionId: string;
        courseId: string;
        contentId: string;
      }) => ({
        url: "addcourse-answer",
        method: "PUT",
        body: {
          answer,
          questionId,
          courseId,
          contentId,
        },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({
        reviews,
        ratings,
        userCourseList,
        courseId,
      }: {
        reviews: string;
        ratings: number | null;
        userCourseList: any;
        courseId: string;
      }) => ({
        url: `/addcourse-review/${courseId}`,
        method: "PUT",
        body: {
          reviews,
          ratings,
        },
        credentials: "include" as const,
      }),
    }),

    addReviewCommentReply: builder.mutation({
      query: ({
        comment,
        courseId,
        reviewId,
      }: {
        comment: string;
        courseId: string;
        reviewId: string;
      }) => ({
        url: `addreply-to-review`,
        method: "PUT",
        body: {
          comment,
          courseId,
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),

      deleteUserReview: builder.mutation({
      query: ({
        courseId,
       reviewId,
      }: {
        courseId: string;
        reviewId: string;
      }) => ({
        url: `delete-review/${courseId}`,
        method: "DELETE",
        body: {
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCoureMutation,
  useGetAllCoursesQuery,
  useDeleteUserCourseMutation,
  useUpdateCourseMutation,
  useGetUserAllCoursesQuery,
  useGetCourseContentDetailsQuery,
  useGetCourseContentDataQuery,
  useAddCourseQuestionMutation,
  useAddAnswerToQuestionMutation,
  useAddReviewMutation,
  useAddReviewCommentReplyMutation,
  useDeleteUserReviewMutation
} = courseApi;
