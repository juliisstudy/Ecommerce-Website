import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useSelector(
    (state: any) => state.cart
  );
  const dispatch = useDispatch();
  const addToCartHandler = (product: any, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const remvoeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="fixed top-0 right-0 w-32 h-full shadow-lg border-l overflow-scroll z-20">
      {loading ? (
        <div className="py-5 px-2">loading</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">cart is empty</div>
      ) : (
        <div className="p-2 flex flex-col items-center border-b ">
          <div>subtotal</div>
          <div>${itemsPrice}</div>
          <div>
            <Link href="/cart" className="w-full text-center ">
              Go to cart
            </Link>
          </div>
          {cartItems.map((item: Product) => (
            <div key={item.id} className="p-2 flex flex-col items-center">
              <Link href={`/product/${item.id}`} className="flex items-center">
                {item.id}
              </Link>
              <select
                value={item.qty}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
              >
                {[...Array(item.countInstock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <button
                className="default-button mt-2"
                onClick={() => remvoeFromCartHandler(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
