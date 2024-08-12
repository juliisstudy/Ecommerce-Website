"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading } from "@/redux/slices/cartSlice";
import PaginationComponent from "./Pagination";
import { ItemList } from "./ItemList";
import { generateRange, sortdata } from "@/app/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";

export default function Filter({ data }: { data: Product[] }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(data);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedRanges, setSelectedRanges] = useState<any>([]);
  const [dropdownSelected, setdropdownSelected] = useState<string>("");
  const [dataPresent, setDataPresent] = useState<boolean>(false);

  const productPerPageInit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(productPerPageInit);

  //labels
  const options = [
    { value: "", lable: "Sort by" },
    { value: "priceMin-Max", lable: "priceMin-Max" },
    { value: "priceMax-Min", lable: "priceMax-Min" },
  ];

  const categoryType = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const ranges = generateRange(0, 300, 50);

  const handelCategorychange = (event: any) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((catg: any) => catg !== category)
      );
    }
  };

  const handleRangeChange = (event: any) => {
    const range = event.target.value;
    if (event.target.checked) {
      setSelectedRanges([...selectedRanges, range]);
    } else {
      setSelectedRanges(selectedRanges.filter((r: any) => r !== range));
    }
  };
  function handleDropdown(event: any) {
    const selectValue = event.target.value;
    setdropdownSelected(selectValue);
    const temp = data;
    sortdata(temp, dropdownSelected);
    setProducts(temp);
  }

  //pagination
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(hideLoading()), [dispatch];
    //search filter
    const search = searchParams.get("query") || "";
    data = data.filter((product) => {
      if (search) {
        return (
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      }
      return true;
    });
    //category and price filter
    const groupedData = data.reduce((acc: any, item: any) => {
      const category = item.category;
      const range = item.range;

      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category][range]) {
        acc[category][range] = [];
      }
      acc[category][range].push(item);
      return acc;
    }, {});

    if (selectedCategories.length === 0 && selectedRanges.length === 0) {
      sortdata(data, dropdownSelected);
      setProducts(data);
      setDataPresent(false);
    } else if (selectedCategories.length > 0) {
      const filteredData = selectedCategories.flatMap((category: any) => {
        if (groupedData[category]) {
          if (selectedRanges.length > 0) {
            return selectedRanges.flatMap((range: any) => {
              if (groupedData[category][range]) {
                return groupedData[category][range].map((item: any) => ({
                  ...item,
                  range,
                }));
              } else {
                return [];
              }
            });
          } else {
            return Object.values(groupedData[category])
              .flat()
              .map((item: any) => ({ ...item, range: item.range }));
          }
        } else {
          return [];
        }
      });
      if (filteredData.length === 0) {
        setProducts([]);
        setDataPresent(true);
      } else {
        sortdata(filteredData, dropdownSelected);
        setProducts(filteredData);
        setDataPresent(false);
      }
    } else if (selectedRanges.length > 0) {
      const filteredData = selectedRanges.flatMap((range: any) => {
        const itemsInRange = Object.values(groupedData)
          .flatMap((ranges: any) => ranges[range] ?? [])
          .map((item: any) => ({ ...item, range }));
        return itemsInRange;
      });
      if (filteredData.length === 0) {
        setProducts([]);
        setDataPresent(true);
      } else {
        sortdata(filteredData, dropdownSelected);
        setProducts(filteredData);
        setDataPresent(false);
      }
    }
  }, [
    selectedCategories,
    selectedRanges,
    dropdownSelected,
    dispatch,
    searchParams,
  ]);

  return (
    <div className="  flex flex-row">
      <div className="w-2/12  mt-10 mr-10">
        {/* dropdown */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <ul>
                {categoryType.map((item, idx) => (
                  <li key={idx} className="flex flex-row gap-4 p-3 text-lg">
                    <div>
                      <input
                        type="checkbox"
                        value={item}
                        checked={selectedCategories.includes(item)}
                        onChange={handelCategorychange}
                      />
                    </div>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <ul>
                {ranges.map((item, idx) => (
                  <li key={idx} className="flex flex-row gap-4 p-3 text-lg">
                    <div>
                      <input
                        type="checkbox"
                        value={item}
                        checked={selectedRanges.includes(item)}
                        onChange={handleRangeChange}
                      />
                    </div>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col mr-20  w-10/12">
        <div>
          <select
            className="float-right text-lg p-1 rounded-lg pl-3 bg-white border border-slate-200"
            value={dropdownSelected}
            onChange={handleDropdown}
            defaultValue={""}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.lable}
                </option>
              );
            })}
          </select>
          <div className="mt-10">
            {dataPresent && (
              <div className="text-center">No product is present</div>
            )}
            <ItemList products={currentProduct} />
          </div>
        </div>
        <PaginationComponent
          productsPerPage={productPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
