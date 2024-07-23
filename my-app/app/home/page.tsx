import React from "react";
import { getProductsList } from "../lib/getData";
import Link from "next/link";
export default async function page() {
  const productsList: Promise<Product[]> = getProductsList();

  const products = await productsList;

  return (
    <div className="mx-20">
      <ItemList products={products} />
    </div>
  );
}
const ItemList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => {
        return <Item key={product.id} product={product} />;
      })}
    </div>
  );
};

const Item = ({ product }: { product: Product }) => {
  return (
    <div className="border border-blue-50">
      <Link href={`/products/${product.id}`}>
        <div>{product.image}</div>
        <div>{product.title}</div>
        <div>{product.price}</div>
        <div>{product.category}</div>
        <div>{product.rating.rate}</div>
        <div>{product.rating.count}</div>
      </Link>
    </div>
  );
};
