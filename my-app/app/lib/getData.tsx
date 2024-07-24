import React from "react";

export async function getProductsList() {
  const res = await fetch("https://fakestoreapi.com/products?limit=10");
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
