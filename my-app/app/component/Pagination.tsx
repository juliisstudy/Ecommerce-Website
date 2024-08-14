"use client";
import React from "react";

import {
  Pagination,
  PaginationContent,
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
            {currentPage === 1 ? (
              <></>
            ) : (
              <PaginationPrevious
                href="#"
                onClick={prevPageHandler}
                className={`${currentPage !== 1 ? "active" : ""}`}
              />
            )}
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
            {currentPage == pageNumber[pageNumber.length - 1] ? (
              <></>
            ) : (
              <PaginationNext
                href="#"
                onClick={nextPageHandler}
                className={`${
                  currentPage !== pageNumber[pageNumber.length - 1]
                    ? "active"
                    : ""
                }`}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
