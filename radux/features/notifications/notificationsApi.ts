import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotifications: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `update-notifications/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useUpdateNotificationsMutation } =
  userApi;
