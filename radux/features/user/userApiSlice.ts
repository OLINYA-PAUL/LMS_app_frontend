import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserAvatar: builder.mutation({
      query: ({ avatar }: { avatar: string }) => ({
        url: "updateuser-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateUserName: builder.mutation({
      query: ({ name }: { name: string }) => ({
        url: "updateuser-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updateUserPassword: builder.mutation({
      query: ({
        oldpassword,
        newpassword,
      }: {
        oldpassword: string;
        newpassword: string;
      }) => ({
        url: "updateuser-password",
        method: "PUT",
        body: { newpassword, oldpassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateUserAvatarMutation,
  useUpdateUserNameMutation,
  useUpdateUserPasswordMutation,
} = userApi;
