"use client";
import React from "react";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

export default function Cartpage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useSelector(
    (state: any) => state.cart
  );
  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };
  //   const addToCartHandler = async () => {
  //     dispatch(addToCart(product.qty));
  //   };
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : cartItems.length === 0 ? (
        <div>
          cart is empty.<Link href="/">go shopping</Link>
        </div>
      ) : (
        <div className="">
          {cartItems.map((item: Product) => (
            <p key={item.id}>{item.title}</p>
          ))}
          <div>
            <ul>
              <li>subtotal ${itemsPrice}</li>
              <li>
                <button onClick={() => router.push("/shipping")}>
                  Process to checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
