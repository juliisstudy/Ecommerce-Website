"use client";
import { hideLoading } from "@/redux/slices/cartSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartSidebar from "./CartSidebar";

export default function App({ children }: { children: any }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);
  return (
    <div>
      <div>{children}</div>
      <CartSidebar />
    </div>
  );
}
