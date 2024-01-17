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

export const addProduct = createAsyncThunk(
  "admin/add-product",
  async ({ data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("description", data.productDescription);
      formData.append("brand", data.brand);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("countInStock", data.stock);
      formData.append("image", data.image);
      const response = await apiInstance.post("/products", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/delete-product",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.delete(`/products/${data.id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
