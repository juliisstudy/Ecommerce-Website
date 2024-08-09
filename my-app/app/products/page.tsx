import React from "react";
import { getProductsList } from "../lib/getData";
import { Metadata } from "next";
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

  return (
    <div className="mx-20 pt-32">
      <Filter data={products} />
    </div>
  );
}
