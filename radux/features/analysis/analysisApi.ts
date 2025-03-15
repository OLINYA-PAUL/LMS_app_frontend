import { apiSlice } from "../api/apiSlice";

export const analysisApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalysis: builder.query({
      query: () => ({
        url: "get-courses-analysis",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserAnalysis: builder.query({
      query: () => ({
        url: "get-user-analysis",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalysis: builder.query({
      query: () => ({
        url: "orders-analysis",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCourseAnalysisQuery,
  useGetUserAnalysisQuery,
  useGetOrderAnalysisQuery,
} = analysisApi;
