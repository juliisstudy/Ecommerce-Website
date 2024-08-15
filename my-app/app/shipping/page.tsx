"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import CheckoutWizard from "../component/CheckoutWizard";
import { Button } from "@/components/ui/button";

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
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
  });

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
    <div className="md:mx-20 pt-40 h-screen">
      <CheckoutWizard activeStep={0} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto w-4/5 mt-20"
      >
        <table className="shipping mx-auto">
          <tbody>
            <tr>
              <td className="">
                <label htmlFor="fullName">Full Name</label>
              </td>
              <td className=" w-20 pr-5">
                <input
                  className="ml-10 border border-slate-200 rounded-sm pl-5 text-xl h-12"
                  id="fullName"
                  autoFocus
                  {...register("fullName", {
                    required: "Please enter your full name",
                    minLength: {
                      value: 3,
                      message: "Full Name should more than 5 characters",
                    },
                  })}
                />
              </td>
              <td>
                {errors.fullName && (
                  <p className="">{errors.fullName.message}</p>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="address">Address</label>
              </td>
              <td>
                <input
                  className=""
                  id="address"
                  autoFocus
                  {...register("address", {
                    required: "Please enter your address",
                    minLength: {
                      value: 3,
                      message: "Address should more than 5 characters",
                    },
                  })}
                />
              </td>
              <td>
                {errors.address && (
                  <span className="">{errors.address.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="city">City</label>
              </td>
              <td>
                <input
                  className=""
                  id="city"
                  autoFocus
                  {...register("city", {
                    required: "Please enter your city",
                    minLength: {
                      value: 3,
                      message: "City is more than 5 characters",
                    },
                  })}
                />
              </td>
              <td>
                {errors.city && <span className="">{errors.city.message}</span>}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="postalCode">ZIP Code</label>
              </td>
              <td>
                <input
                  className=""
                  id="postalCode"
                  autoFocus
                  {...register("postalCode", {
                    required: "Please enter ZIP Code",
                    minLength: {
                      value: 6,
                      message: "ZIP Code should 6 digits",
                    },
                  })}
                />
              </td>
              <td>
                {errors.postalCode && (
                  <span className="">{errors.postalCode.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="country">Country</label>
              </td>
              <td>
                <input
                  className=""
                  id="country"
                  autoFocus
                  {...register("country", {
                    required: "please enter your country",
                    minLength: {
                      value: 3,
                      message: "Country should more than 5 characters",
                    },
                  })}
                />
              </td>
              <td>
                {errors.country && (
                  <span className="">{errors.country.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <td></td>

              <td className="mt-20 float-right mr-6">
                <Button onClick={() => router.push("/payment")}>
                  Process to checkout
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
