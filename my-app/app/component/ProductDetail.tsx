import React from "react";

import AddToCart from "@/app/component/AddToCart";
import Image from "next/image";
import ProductRate from "@/app/component/ProductRate";

export default function ({ product }: { product: Product }) {
  return (
    <div className=" ">
      <div className=" h-3/5 w-3/5  mx-auto mb-2 ">
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
          className="  h-2/5 w-2/5  mx-auto p-10 border border-blue-50"
        />
        <div className="ml-4 mt-6">
          <div className="text-slate-700 text-base leading-relaxed mb-2">
            {product.title}
          </div>
          <ProductRate
            rate={product.rating.rate}
            count={product.rating.count}
          />
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
      </div>

      <div className="absolute bottom-3 right-4"></div>
    </div>
  );
}
