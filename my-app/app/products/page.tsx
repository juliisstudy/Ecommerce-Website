import React from "react";
import { getProductsList, productsFilter } from "../lib/getData";
import Link from "next/link";
import Search from "@/app/component/Search";

// export const metadata:Metadata={

// }

export default async function page() {
  const productsList: Promise<Product[]> = getProductsList();

  const products = await productsList;

  // const productList = await productsFilter();
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
