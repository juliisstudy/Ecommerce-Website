"use client";
import React from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import { ProductState } from "@/redux/slices/cartSlice";

export default function Nav() {
  const { loading, cartItems } = useSelector((state: any) => state.cart);

  return (
    <div>
      <div>Logo</div>
      <Search placeholder="Search players..." />
      <div>
        {loading
          ? ""
          : cartItems.reduce((a: number, c: Product) => a + c.qty, 0)}
      </div>
    </div>
  );
}
