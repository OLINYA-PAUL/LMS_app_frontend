import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

const handleAuthResponse = async (queryFulfilled: any, dispatch: any) => {
  try {
    const {
      data: { access_token, user },
    } = await queryFulfilled;

    console.log({ RELOADUSER: { access_token, user } });

    dispatch(
      userLogin({
        accessToken: "",
        user: user,
      })
    );
  } catch (error: any) {
    console.log("Error handling authentication:", error.message);
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include" as const,
    headers: { "Content-Type": "application/json" },
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh-token",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log("fetching refresh token", queryFulfilled);
        await handleAuthResponse(queryFulfilled, dispatch);
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log("fetching user", queryFulfilled);
        await handleAuthResponse(queryFulfilled, dispatch);
      },
    }),
  }),
});

export const { useLazyRefreshTokenQuery, useLoadUserQuery } = apiSlice;
