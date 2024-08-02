"use client";
import { store } from "./store";
import { Provider } from "react-redux";

export function StoreProvider({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}
