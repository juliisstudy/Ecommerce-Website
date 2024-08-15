"use client";
import React from "react";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

export default function Cartpage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useSelector(
    (state: any) => state.cart
  );
  const remvoeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const addToCartHandler = (product: any, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div className="md:mx-20 pt-40 h-screen">
      <h1 className="text-slate-600 text-xl ml-5 md:ml-20">Shopping Cart</h1>
      {loading ? (
        <div>loading</div>
      ) : cartItems.length === 0 ? (
        <div className="w-3/5 mx-auto">
          Cart is empty.
          <br />
          <Link href="/products" className="">
            <Button className="goShoppingbtn mt-5">go shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="w-4/5 mt-10  md:w-3/5 mx-auto ">
          <div className="">
            <table className="md:w-full text-center ">
              <thead>
                <tr>
                  <th className="p-5">Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: Product) => (
                  <tr key={item.id}>
                    <td className="w-1/5">
                      <Link href={`/product/${item.id}`} className="px-5 pl-5">
                        <Image
                          src={item.image}
                          width={80}
                          height={80}
                          alt={item.title}
                          className="mx-auto"
                        />
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-row items-center justify-center gap-4">
                        <select
                          className="bg-white text-lg border border-slate-200 p-2 rounded-md"
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
                          className="w-6 h-6 delte m-2"
                          onClick={() => remvoeFromCartHandler(item.id)}
                        />
                      </div>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="float-right">
            <p className="font-bold text-lg mt-10 ml-4">
              Subtotal ${itemsPrice}
            </p>
            <div>
              <Button
                className="font-bold mt-5 ml-2"
                onClick={() => router.push("/shipping")}
              >
                Process to checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
