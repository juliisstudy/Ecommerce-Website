import React from "react";
const ItemPerPage = 9;
export async function getProductsList() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}

export async function getProduct(productId: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!res.ok) throw new Error("failed to fetch user");
  return res.json();
}

export async function fetchPages(query: string) {
  const productsList: Promise<Product[]> = getProductsList();
  let products = await productsList;

  const totalPage = Math.ceil(products.length / ItemPerPage);
  return totalPage;
}
