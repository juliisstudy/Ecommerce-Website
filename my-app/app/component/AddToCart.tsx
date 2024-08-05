"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/slices/cartSlice";

type Params = {
  product: Product;
  showQty: boolean;
  redirect: boolean;
  increasePerClick: boolean;
};

export default function AddToCart({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}: Params) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    let newQty = qty;
    if (increasePerClick) {
      const existItem = cartItems.find((x: Product) => x.id === product.id);
      if (existItem) {
        if (existItem.qty + 1 <= product.countInstock) {
          newQty = existItem.qty + 1;
        } else {
          return alert("No more product exist");
        }
      }
    }
    dispatch(addToCart({ ...product, qty: newQty }));
    if (redirect) router.push("/cart");
  };
  return (
    <>
      {product.countInstock > 0 && showQty && (
        <div className="mb-2 flex justify-between">
          <div>QTY</div>
          <div>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInstock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>
        {product.countInstock > 0 ? (
          <button onClick={addToCartHandler}>add to cart</button>
        ) : (
          <button disabled>out of stock</button>
        )}
      </div>
    </>
  );
}
