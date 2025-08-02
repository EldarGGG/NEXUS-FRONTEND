import { createSlice } from '@reduxjs/toolkit';
import type { Category } from '@/types/Category';

type CategoriesState = Category[];

const initialState: CategoriesState = [{ title: 'Торты', items: [1, 2, 3, 4, 5, 6, 7, 8] }];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const categoriesActions = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
