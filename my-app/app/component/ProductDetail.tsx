import React from "react";

import AddToCart from "@/app/component/AddToCart";
import Image from "next/image";
import ProductRate from "@/app/component/ProductRate";

export default function ({ product }: { product: Product }) {
  return (
    <div className=" ">
      <div className=" h-3/5 w-3/5 mx-auto mb-2 mt-5">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
          className=" h-4/5 w-4/5  md:h-2/5 md:w-2/5  mx-auto border border-blue-50 md:p-10"
        />
      </div>
      <div className="ml-4 mt-6">
        <div className="text-slate-700 text-base leading-relaxed mb-2">
          {product.title}
        </div>
        <ProductRate rate={product.rating.rate} count={product.rating.count} />
        <div className="text-slate-700 text-base leading-relaxed py-4 font-bold">
          ${product.price}
        </div>
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>

      <div className=""></div>
    </div>
  );
}
