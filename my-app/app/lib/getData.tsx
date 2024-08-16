import { checkIfInRange } from "./utils";

export async function getProductsList() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
export async function dataFormat(): Promise<Product[]> {
  const productList: Promise<Product[]> = getProductsList();
  const productlist = await productList;

  const products = productlist.map((item: Product) => ({
    ...item,
    range: checkIfInRange(item.price),
    countInstock: Math.floor(Math.random() * 10),
  }));
  return products;
}
export async function getProduct(productId: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!res.ok) throw new Error("failed to fetch user");
  return res.json();
}
