import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "next/headers";
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
}
export interface ProductState {
  loading: boolean;
  cartItems: Product[];
  itemsPrice: number | string;
  shippingPrice: number;
  taxRate: number;
  taxPrice: number;
  totalPrice: number;
}
const initialState: ProductState = {
  loading: true,
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxRate: 0.07,
  taxPrice: 0,
  totalPrice: 0,
};

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: Product) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x: Product) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.itemsPrice = addDecimals(
        Number(
          state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      );

      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 10
      );
      state.taxPrice = addDecimals(
        Number((state.taxRate * state.itemsPrice).toFixed(2))
      );
      state.totalPrice = addDecimals(
        state.taxPrice + state.itemsPrice + state.taxPrice
      );
      cookies().set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      state.itemsPrice = addDecimals(
        Number(
          state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      );

      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 10
      );
      state.taxPrice = addDecimals(
        Number((state.taxRate * state.itemsPrice).toFixed(2))
      );
      state.totalPrice = addDecimals(
        state.taxPrice + state.itemsPrice + state.taxPrice
      );
      cookies().set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});
export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;
export default cartSlice.reducer;
