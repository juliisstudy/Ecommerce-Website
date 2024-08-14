"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { savePaymentMethod } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

type FormValue = {
  paymentMethod: string;
};
export default function Paymentpage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValue>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });
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
    <div className="mx-20 pt-40 h-screen">
      <CheckoutWizard activeStep={2} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto w-3/5 mt-20 "
      >
        {["PayPal", "Credit Card"].map((payment) => (
          <div key={payment}>
            <input
              name="paymentMethod"
              id={payment}
              type="radio"
              value={payment}
              {...(register("paymentMethod"),
              {
                require: "Please select your payment method",
              })}
            />
            <label htmlFor={payment} className="ml-10">
              {payment}
            </label>
            {errors.paymentMethod && (
              <p className="text-slate-800">{errors.paymentMethod.message}</p>
            )}
          </div>
        ))}
        <Button
          onClick={() => router.push("/placeorder")}
          className="mt-20 ml-10"
        >
          Review Order
        </Button>
      </form>
    </div>
  );
}
