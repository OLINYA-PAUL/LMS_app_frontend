import { headers } from "next/headers";
import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLogin, userLogout } from "./authSlice";
// import Login from "@/app/components/auth/login";

interface registrationResponse {
  message: string;
  activationToken: string;
}

interface registrationData {
  name: string;
  email: string;
  password: string;
}
interface loginData {
  email: string;
  password: string;
}

// interface loginResponse {
//   activationToken: string;
// }

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<registrationResponse, registrationData>({
      query: ({
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }) => ({
        url: "registration",
        method: "POST",
        body: { name, email, password },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log({ REGISTER: data });

          dispatch(
            userRegistration({
              token: data.activationToken,
            })
          );
        } catch (error: any) {
          console.error("Registration failed:", error.message);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "login-user",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: {
              access_token,
              arg: { _doc: user },
            },
          } = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: access_token,
              user: user,
            })
          );
        } catch (error: any) {
          console.log("Login failed", error.message);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({
        email,
        name,
        avatar,
      }: {
        email: string;
        name: string;
        avatar: string;
      }) => ({
        url: "social-auth",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: {
              access_token,
              arg: { _doc: user },
            },
          } = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: access_token,
              user: user,
            })
          );
        } catch (error: any) {
          console.log("Login failed", error.message);
        }
      },
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "logout-user",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
        } catch (error: any) {
          console.log("Login failed", error.message);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLazyLogoutUserQuery,
  useSocialAuthMutation,
} = authApi;
