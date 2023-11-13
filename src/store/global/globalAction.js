import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/api";

export const fetchAllProduct = createAsyncThunk(
	"product/fetch-all",
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get("/products");
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchSingleProduct = createAsyncThunk(
	"product/fetch-single-product",
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get(`/products/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const checkoutProducts = createAsyncThunk(
	"product/checkout",
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiInstance.post(`/orders`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateProduct = createAsyncThunk(
	"product/update",
	async ({ data }, { rejectWithValue }) => {
		try {
			const response = await apiInstance.patch(
				`/products/${data.id}`,
				data.product
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchReportSales = createAsyncThunk(
	"admin/report-sales",
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiInstance.get("/orders/report-sales");
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
