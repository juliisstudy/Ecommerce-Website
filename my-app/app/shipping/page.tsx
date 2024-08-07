"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";

type FormValues = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
export default function ShippingAddresspage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state: any) => state.cart);

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: FormValues) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    router.push("/payment");
  };
  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="fullName">fullName</label>
          <input
            className=""
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "please enter full name",
              minLength: {
                value: 3,
                message: "address is more than 2 chars",
              },
            })}
          />
          {errors.fullName && <div className="">{errors.fullName.message}</div>}
        </div>
        <div>
          <label htmlFor="address">fullName</label>
          <input
            className=""
            id="address"
            autoFocus
            {...register("address", {
              required: "please enter address",
              minLength: {
                value: 3,
                message: "address is more than 5 chars",
              },
            })}
          />
          {errors.address && <div className="">{errors.address.message}</div>}
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            className=""
            id="city"
            autoFocus
            {...register("city", {
              required: "please enter city",
              minLength: {
                value: 3,
                message: "city is more than 5 chars",
              },
            })}
          />
          {errors.city && <div className="">{errors.city.message}</div>}
        </div>
        <div>
          <label htmlFor="postalCode">city</label>
          <input
            className=""
            id="postalCode"
            autoFocus
            {...register("postalCode", {
              required: "please enter postalCode",
              minLength: {
                value: 3,
                message: "postalCode is more than 5 chars",
              },
            })}
          />
          {errors.postalCode && (
            <div className="">{errors.postalCode.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="country">country</label>
          <input
            className=""
            id="country"
            autoFocus
            {...register("country", {
              required: "please enter country",
              minLength: {
                value: 3,
                message: "country is more than 5 chars",
              },
            })}
          />
          {errors.country && <div className="">{errors.country.message}</div>}
        </div>
        <div>
          <button onClick={() => router.push("/payment")}>
            Process to checkout
          </button>
        </div>
      </form>
    </div>
  );
}
