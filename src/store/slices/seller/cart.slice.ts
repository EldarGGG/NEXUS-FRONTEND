import { createSlice } from '@reduxjs/toolkit';

interface SellerCartState {}

const initialState: SellerCartState = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
