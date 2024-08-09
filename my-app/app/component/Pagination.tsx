"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { generatePagination } from "../lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Params = {
  productsPerPage: number;
  totalProducts: number;
  paginate: Function;
  currentPage: number;
};

export default function PaginationComponent({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}: Params) {
  const pageNumber = [
    ...Array(Math.ceil(totalProducts / productsPerPage)).keys(),
  ].map((i) => i + 1);

  const prevPageHandler = () => {
    if (currentPage !== 1) paginate(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== pageNumber[pageNumber.length - 1])
      paginate(currentPage + 1);
  };
  return (
    <div className="mt-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={prevPageHandler}
              className={`${currentPage !== 1 ? "active" : ""}`}
            />
          </PaginationItem>

          {pageNumber.map((number) => (
            <PaginationItem key={number} className="">
              <PaginationLink
                href="#"
                className={`${currentPage === number ? "active" : ""}`}
                onClick={() => paginate(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={nextPageHandler}
              className={`${
                currentPage !== pageNumber[pageNumber.length - 1]
                  ? "active"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* 
      <nav className="flex flex-row">
        <span>prev</span>
        {pageNumber.map((number) => (
          <span key={number} className="w-5 h-5 border border-red-500">
            <a
              href="#"
              className={`${currentPage === number ? "active" : ""}`}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </span>
        ))}
        <span
          onClick={nextPageHandler}
          className={`${
            currentPage !== pageNumber[pageNumber.length - 1] ? "active" : ""
          }`}
        >
          prev
        </span>
      </nav> */}
    </div>
  );
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // const currentPage = Number(searchParams.get("page")) || 1;

  // const createPageURL = (pageNumber: number | string) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("page", pageNumber.toString());
  //   console.log(params);
  //   return `${pathname}?${params.toString()}`;
  // };

  // const allPages = generatePagination(currentPage, totalPage);

  // return (
  //   <div className="inline-flex">
  //     {currentPage}
  //     <PaginationArrow
  //       direction="left"
  //       href={createPageURL(currentPage - 1)}
  //       isDisabled={currentPage <= 1}
  //     />
  //     <div className="flex -space-x-px">
  //       {allPages.map((page, index) => {
  //         let position: "first" | "last" | "single" | "middle" | undefined;
  //         if (index === 0) position = "first";
  //         if (index === allPages.length - 1) position = "last";
  //         if (allPages.length === 1) position = "single";
  //         if (page === "...") position = "middle";
  //         return (
  //           <PaginationNumber
  //             key={page}
  //             href={createPageURL(page)}
  //             page={page}
  //             position={position}
  //             isActive={currentPage === page}
  //           />
  //         );
  //       })}
  //     </div>

  //     <PaginationArrow
  //       direction="right"
  //       href={createPageURL(currentPage + 1)}
  //       isDisabled={currentPage + 1 >= totalPage}
  //     />
  //   </div>
  // );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border hover:bg-cyan-700",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-cyan-600 border-cyan-600 text-white": isActive,
      "hover:bg-cyan-700": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );
  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-sm border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-cyan-700": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );
  const icon =
    direction == "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
