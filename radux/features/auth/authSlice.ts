import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      { payload }: PayloadAction<{ token: string }>
    ) => {
      state.token = payload.token;
    },

    userLogin: (
      state,
      { payload }: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = payload.accessToken;
      state.user = payload.user;
    },

    userLogout: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
