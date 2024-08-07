import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
