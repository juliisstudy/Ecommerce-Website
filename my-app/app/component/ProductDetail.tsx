import React from "react";

import AddToCart from "@/app/component/AddToCart";
import Image from "next/image";
import ProductRate from "@/app/component/ProductRate";

export default function ({ product }: { product: Product }) {
  return (
    <div className="border border-blue-50 relative">
      <div className=" h-56 mx-auto mb-2">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
          className=" w-48 h-56 mx-auto"
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
      </div>
      <div className="absolute bottom-3 right-4">
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
}
