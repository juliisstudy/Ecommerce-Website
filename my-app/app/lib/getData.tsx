import exp from "constants";
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

export function fetchPages(products: Product[]) {
  const totalPage = Math.ceil(products.length / ItemPerPage);
  return totalPage;
}
export async function getProductByPage(currentPage: number) {
  const offset = (currentPage - 1) * ItemPerPage;
  const list = await getProductsList();
  return list.slice(offset, offset + ItemPerPage);
}

export async function fetchCategory(): Promise<Array<string>> {
  const list: Promise<Product[]> = await getProductsList();
  let products = await list;
  let category = new Set<string>();

  products.map((product) => {
    category.add(product.category);
  });

  let categorylist = Array.from(category);

  return categorylist;
}
