import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./authAction";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = payload.response.data.message;
      state.token = null;
      state.user = null;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = payload?.data?.token;
      state.user = payload?.data;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.message;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
