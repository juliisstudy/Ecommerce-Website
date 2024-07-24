import React from "react";

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

export async function productsFilter(search: string) {
  const prductFilter: Promise<Product[]> = getProductsList();
  const productList = await prductFilter;
  productList.filter((product) => {
    return (
      (search && product && product.title.toLowerCase().includes(search)) ||
      product.category.includes(search)
    );
  });
}
