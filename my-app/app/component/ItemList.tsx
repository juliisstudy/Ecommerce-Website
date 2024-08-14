import React from "react";
import Link from "next/link";
import AddToCart from "./AddToCart";
import Image from "next/image";
import ProductRate from "@/app/component/ProductRate";

export const ItemList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => {
        return <Item key={product.id} product={product} />;
      })}
    </div>
  );
};

export const Item = ({ product }: { product: Product }) => {
  return (
    <div className="border border-blue-50 relative">
      <Link href={`/products/${product.id}`}>
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
          <ProductRate
            rate={product.rating.rate}
            count={product.rating.count}
          />
          <div className="text-slate-700 text-base leading-relaxed py-4 font-bold">
            ${product.price}
          </div>
        </div>
      </Link>
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
};
