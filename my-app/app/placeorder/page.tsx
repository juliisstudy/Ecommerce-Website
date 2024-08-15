"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
type FormValue = {
  paymentMethod: string;
};
export default function Paymentpage() {
  const {
    cartItems,
    shippingPrice,
    itemsPrice,
    shippingAddress,
    taxPrice,
    paymentMethod,
    totalPrice,
  } = useSelector((state: any) => state.cart);
  const router = useRouter();

  return (
    <div className="md:mx-20 pt-40 min-h-screen">
      <CheckoutWizard activeStep={3} />
      <div className="w-3/5 mx-auto min-h-max">
        <div className="flex flex-col gap-2">
          <table className="w-full text-center text-slate-600">
            <thead>
              <tr>
                <th colSpan={3} className="text-xl h-20">
                  Order Review
                </th>
              </tr>
              <tr>
                <th className="mt-10">Product</th>
                <th className="mt-10">Qty</th>
                <th className="mt-10">Price</th>
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
                  <td className="w-1/5">{item.qty}</td>
                  <td className="w-1/5">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="mt-12 float-right mr-32 mb-20 md:ml-24">
            <tbody>
              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">
                  Total Products Price
                </td>
                <td className="pl-10">$ {itemsPrice}</td>
              </tr>
              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">
                  Shipping Price
                </td>
                <td className="pl-10">$ {shippingPrice}</td>
              </tr>

              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">Tax Price</td>
                <td className="pl-10">$ {taxPrice}</td>
              </tr>
              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">
                  Total Price
                </td>
                <td className="pl-10">$ {totalPrice}</td>
              </tr>
              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">
                  Payment Method
                </td>
                <td className="pl-10">
                  {paymentMethod}
                  <Link
                    className="ml-5 text-sky-600 hover:text-sky-300"
                    href="/payment"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              <tr className="border-b md:border-none">
                <td className="font-semibold text-lg mt-10 ml-4">
                  Shipping Address
                </td>
                <td className="pl-10">
                  {shippingAddress.fullName},{shippingAddress.address},
                  {shippingAddress.city}
                  <Link
                    className="ml-5 text-sky-600 hover:text-sky-300"
                    href="/shipping"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Button
                    className="font-bold mt-10 float-right"
                    onClick={() => router.push("/thankyou")}
                  >
                    Process to checkout
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
