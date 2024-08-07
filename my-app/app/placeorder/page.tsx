"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";
import { useDispatch, useSelector } from "react-redux";

type FormValue = {
  paymentMethod: string;
};
export default function Paymentpage() {
  const {
    cartItems,
    shippingPrice,
    itemsPrice,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = useSelector((state: any) => state.cart);

  //    loading: true,
  //   cartItems: [],
  //   itemsPrice: 0,
  //   shippingPrice: 0,
  //   taxRate: 0.07,
  //   taxPrice: 0,
  //   totalPrice: 0,
  //   shippingAddress: {},
  //   paymentMethod: "",
  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <p>{shippingPrice}</p>
      <p>{itemsPrice}</p>
      <p>{totalPrice}</p>
      <p>{paymentMethod}</p>
    </div>
  );
}
