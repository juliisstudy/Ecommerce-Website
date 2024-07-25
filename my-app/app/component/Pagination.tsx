import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { generatePagination } from "../lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currenPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString}`;
  };

  const allPages = generatePagination(currenPage, totalPage);

  return <div>Pagination</div>;
}
