import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CartSidebar() {
  const [expand, setExpand] = useState(false);
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
  const cartNum = cartItems.reduce((a: number, c: Product) => a + c.qty, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full shadow-lg border-l overflow-hidden z-50 bg-white 
    ${expand ? "w-56" : "w-10 md:w-20"}`}
    >
      {loading ? (
        <div className="">loading</div>
      ) : (
        <div>
          <div className="">
            <button
              className="relative"
              onClick={() => setExpand((curr) => !curr)}
            >
              <FaCartShopping className="w-8 h-8 m-2 md:m-5 shoppingcart" />
            </button>
            <span className="absolute dot z-10 left-4 md:left-9 font-bold ">
              <p className="-mt-0.5">{cartNum}</p>
            </span>
          </div>
        </div>
      )}
      {expand ? (
        <div className="p-2 flex flex-col items-center border-b gap-3 ">
          <div className="font-bold text-lg">Subtotal</div>
          <div className="font-bold text-lg">${itemsPrice}</div>
          <div>
            <Link href="/cart" className="">
              <Button>Go to cart</Button>
            </Link>
          </div>
          {cartItems.map((item: Product) => (
            <div key={item.id} className="p-2 flex flex-col items-center">
              <Link href={`/product/${item.id}`} className="flex items-center">
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.title}
                />
              </Link>
              <div className="flex flex-row mt-2">
                <select
                  className="bg-white text-lg border border-slate-200 p-1 rounded-md"
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInstock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <MdDelete
                  className="w-6 h-6 delte ml-4 m-1"
                  onClick={() => remvoeFromCartHandler(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
