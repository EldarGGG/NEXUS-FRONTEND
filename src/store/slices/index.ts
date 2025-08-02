import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import { cartReducer as buyerCartReducer } from './buyer/cart.slice';
// import { cartReducer } from './seller/cart.slice';
import { categoriesReducer } from './seller/categories.slice';

export const rootReducer = combineReducers({
  buyerCart: buyerCartReducer,
  // sellerCart: cartReducer,
  categories: categoriesReducer,
});
