import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/api";

export const signIn = createAsyncThunk(
  "auth/signin",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/auth/login`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/auth/register`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
