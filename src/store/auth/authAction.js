import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/api";

export const signIn = createAsyncThunk(
	"auth/signin",
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiInstance.post(`/auth/login`, data);
			console.log(response);
			return response.data;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);
