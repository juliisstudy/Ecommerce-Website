"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

enum PaymentMethod {
  PayPal = "PayPal",
  CreditCard = "Credit Card",
}

interface FormValue {
  paymentMethod: PaymentMethod;
}

export default function Paymentpage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValue>({ mode: "onChange" });

  const router = useRouter();
  const dispatch = useDispatch();

  const { shippingAddress, paymentMethod } = useSelector(
    (state: any) => state.cart
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, shippingAddress, router, setValue]);

  const submitHandler = ({ paymentMethod }: FormValue) => {
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };

  return (
    <div className="md:mx-20 pt-40 h-screen">
      <CheckoutWizard activeStep={2} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto w-3/5 mt-20  "
      >
        <input
          value="paypal"
          type="radio"
          id="paymentMethod"
          {...register("paymentMethod")}
        />

        <label> Paypal </label>
        <br />
        <input
          className="mt-10"
          value="CreditCard"
          type="radio"
          id="CreditCard"
          {...register("paymentMethod")}
        />
        <label> Credit Card </label>
        {errors.paymentMethod && (
          <p className="text-slate-800">{errors.paymentMethod.message}</p>
        )}
        <br />
        <Button onClick={() => router.push("/placeorder")} className="mt-20">
          Review Order
        </Button>
      </form>
    </div>
  );
}
