import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

const handleAuthResponse = async (queryFulfilled: any, dispatch: any) => {
  try {
    const {
      data: {
        access_token,
        arg: { _doc: user },
      },
    } = await queryFulfilled;

    console.log({ RELOADUSER: { access_token, user } });
    dispatch(
      userLogin({
        accessToken: access_token,
        user: user,
      })
    );
  } catch (error: any) {
    console.error("Error handling authentication:", error.message);
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include" as const,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh-token",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
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
        await handleAuthResponse(queryFulfilled, dispatch);
      },
    }),
  }),
});

export const { useLazyRefreshTokenQuery, useLoadUserQuery } = apiSlice;
