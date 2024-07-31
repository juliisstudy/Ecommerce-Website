import React, { ReactNode } from "react";
import { getProductsList, fetchPages, fetchCategory } from "../lib/getData";
import Link from "next/link";
import { Metadata } from "next";
import Pagination from "@/app/component/Pagination";
import Filter from "../component/Filter";
export const metadata: Metadata = {
  title: "products",
};

export default async function page({
  searchParams,
}: {
  searchParams?: { filter?: string; page?: string };
}) {
  const productsList: Promise<Product[]> = getProductsList();
  let products = await productsList;

  const currentPage = Number(searchParams?.page) || 1;
  products = products.filter((product) => {
    if (searchParams?.filter) {
      return (
        product.title
          .toLowerCase()
          .includes(searchParams.filter.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(searchParams.filter.toLowerCase()) ||
        product.price === searchParams.filter
      );
    }
    return true;
  });
  const totalPage = fetchPages(products);
  //const list = getCurrentProducts(currentPage, products);

  return (
    <div className="mx-20">
      <Filter data={products} />
      {/* <ItemList products={list} /> */}
      <div className="">
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}

const ProductTabFilter = (category: string, products: Product[]) => {
  const list = products.filter((product) => {
    product.category === category;
  });
  return list;
};

const ItemPerPage = 8;
const getCurrentProducts = (currentPage: number, products: Product[]) => {
  const offset = (currentPage - 1) * ItemPerPage;
  const list = products.slice(offset, offset + ItemPerPage);
  return list;
};

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
