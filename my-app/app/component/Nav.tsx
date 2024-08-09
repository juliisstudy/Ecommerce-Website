"use client";
import React from "react";
import Search from "./Search";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
export default function Nav() {
  const { loading, cartItems } = useSelector((state: any) => state.cart);

  const cartNum = cartItems.reduce((a: number, c: Product) => a + c.qty, 0);
  return (
    <div className="fixed flex flex-row h-30 bg-white w-full drop-shadow-lg gap-5 z-10 ">
      <div className=" h-10 w-20 text-2xl font-bold ml-20 my-auto tracking-wide">
        SHOP
      </div>
      <div className="w-3/5 ml-48">
        <Search placeholder="Search products..." />
      </div>
      <div className="ml-10 mt-5 ">
        <FaCartShopping className="w-8 h-8 " />
        {loading ? "" : <span className="dot">{cartNum}</span>}
      </div>
    </div>
  );
}
