import React from "react";
import { getProductsList } from "../lib/getData";
import Link from "next/link";
import { Metadata } from "next";
// import ProductList from "@/app/component/ProductList";
export const metadata: Metadata = {
  title: "products",
};

export default async function page({
  searchParams,
}: {
  searchParams?: { filter: string };
}) {
  const productsList: Promise<Product[]> = getProductsList();
  let products = await productsList;

  products = products.filter((product) => {
    if (searchParams?.filter) {
      return (
        product.title
          .toLowerCase()
          .includes(searchParams.filter.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(searchParams.filter.toLowerCase()) ||
        product.price === Number(searchParams.filter)
      );
    }
    return true;
  });

  console.log(products.length);

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
