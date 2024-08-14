"use client";
import React from "react";
import Search from "./Search";
import Link from "next/link";
export default function Nav() {
  return (
    <div className="fixed flex flex-row h-30 bg-white w-full drop-shadow-lg gap-5 z-10 ">
      <div className=" h-10 w-20 text-2xl font-bold ml-20 my-auto tracking-wide">
        <Link href="/products"> SHOP</Link>
      </div>
      <div className="w-3/5 ml-48">
        <Search placeholder="Search products..." />
      </div>
    </div>
  );
}
