import React, { Suspense } from "react";
import { dataFormat } from "../lib/getData";
import { Metadata } from "next";
import Filter from "../component/Filter";
export const metadata: Metadata = {
  title: "products",
};

export default async function page() {
  let products = await dataFormat();

  return (
    <div className="ml-2 md:mx-20 pt-32 mb-10 min-h-screen ">
      <Suspense fallback={<div>Loading</div>}>
        <Filter data={products} />
      </Suspense>
    </div>
  );
}
