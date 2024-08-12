import React from "react";
import { getProductsList, dataFormat } from "../lib/getData";
import { Metadata } from "next";
import Filter from "../component/Filter";
import { ItemList } from "@/app/component/ItemList";
export const metadata: Metadata = {
  title: "products",
};

export default async function page() {
  let products = await dataFormat();

  return (
    <div className="mx-20 pt-32">
      <Filter data={products} />
    </div>
  );
}
