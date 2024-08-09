import React from "react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";

export default function ProductRate({
  rate,
  count,
}: {
  rate: number;
  count: number;
}) {
  return (
    <div className="flex">
      <Rating style={{ maxWidth: 100 }} value={rate} readOnly />
      {count} reviews
    </div>
  );
}
