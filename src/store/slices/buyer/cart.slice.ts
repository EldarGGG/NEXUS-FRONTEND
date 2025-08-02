import { createSlice } from '@reduxjs/toolkit';

// interface BuyerCartState {
//   id?: number;
//   image: string;
//   title: string;
//   shop: string;
//   weight: string;
//   count: number;
//   price: string;
//   perPiece: string;
//   inStock: number;
//   cartSize: number;
// }

interface BuyerCartState {
  weight: string;
  counter: number;
  price: string;
  perPiece: string;
  inStock: number;
  cartSize: number;
  id: number,
  amount: number,
  preview: string;
  methods: string[];
  name: string,
  image: string,
  subcategory: {
    id: number,
    name: string,
    store: number;
    category: {
      id: number,
      name: string,
    }
  },
  uom: {
    name: string
  }
}

const initialState: BuyerCartState[] = [];

export const cartSlice = createSlice({
  name: 'buyer/cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Удаляем из старого массива старый продукт
      let arr = state.filter((product) => product.id !== action.payload.id);
      // Объединяем в новый массив
      let newArr = [...arr, action.payload]
      // Сортируем чтобы при изменении массива не менялся его порядок
      newArr.sort((a,b) => a.id - b.id)
      // Возвращаем новый массив
      return newArr;
    },

    removeFromCart: (state, action) => {
      let filtered = state.filter((product) => product.id !== action.payload.id);

      return filtered;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
