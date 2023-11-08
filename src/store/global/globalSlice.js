/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import {
	fetchAllProduct,
	fetchSingleProduct,
	checkoutProducts,
	fetchReportSales,
	updateProduct,
} from "./globalAction";

const initialState = {
	products: [],
	isLoading: false,
	error: null,
	carts: [],
};

const globalSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		addToCart: (state, { payload }) => {
			const isProductInCart = state.carts.find(
				(product) => product?._id === payload._id
			);

			if (isProductInCart) {
				state.carts = state.carts.map((item) =>
					item?._id === payload._id
						? { ...item, quantity: payload.buyStock ? item.quantity + payload.buyStock : item.quantity + 1 }
						: item
				);
			} else {
				state.carts = [
					...state.carts,
					{
						...payload,
						quantity: payload.buyStock ? payload.buyStock : 1,
					},
				];
			}
		},
		removeFromCart: (state, { payload }) => {
			state.carts = state.carts.filter((cartItem) => cartItem._id !== payload._id);
		},		
		clearCarts: (state) => {
			state.carts = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProduct.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAllProduct.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(fetchAllProduct.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.products = payload.data;
		});
		builder.addCase(fetchSingleProduct.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchSingleProduct.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(fetchSingleProduct.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(checkoutProducts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(checkoutProducts.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(checkoutProducts.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchReportSales.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchReportSales.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(fetchReportSales.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(updateProduct.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(updateProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(updateProduct.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
	},
});

export const { addToCart, removeFromCart, clearCarts } = globalSlice.actions;
export default globalSlice.reducer;
