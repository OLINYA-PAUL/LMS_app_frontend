"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../radux/features/api/apiSlice";
import authSlice from "../radux/features/auth/authSlice";

export const storeConfigs = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
});

// initialise app to refress token every page reload

const initialiseApp = async () => {
  // Attempt to refresh the token
  const refreshResponse = await storeConfigs.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  console.log({ refreshResponse });
  if (
    refreshResponse.data?.accessToken &&
    refreshResponse.data?.status === "fulfilled"
  ) {
    // If refresh was successful, attempt to load the user data
    const userResponse = await storeConfigs.dispatch(
      apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
    console.log({ userResponse });
  }
};

initialiseApp();
