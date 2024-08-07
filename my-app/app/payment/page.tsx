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
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();
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
    dispatch(savePaymentMethod(paymentMethod));
    router.push("/placeorder");
  };

  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <form onSubmit={handleSubmit(submitHandler)}>
        {["payPal", "creditcard"].map((payment) => (
          <div key={payment}>
            <input
              name="paymentMethod"
              id={payment}
              type="radio"
              value={payment}
              {...(register("paymentMethod"),
              {
                require: "please select payment method",
              })}
            />
            <label htmlFor={payment}>{payment}</label>
            {errors.paymentMethod && (
              <div className="">{errors.paymentMethod.message}</div>
            )}
          </div>
        ))}
        <button onClick={() => router.push("/placeorder")}>review order</button>
      </form>
    </div>
  );
}
