"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Filter({ data }: { data: Product[] }) {
  const [products, setProducts] = useState<Product[]>(data);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedRanges, setSelectedRanges] = useState<any>([]);
  const [dataPresent, setDataPresent] = useState<boolean>(false);
  const [dropdownSelected, setdropdownSelected] = useState<string>("");

  const options = [
    { value: "priceMin-Max", lable: "priceMin-Max" },
    { value: "priceMax-Min", lable: "priceMax-Min" },
  ];

  const getUniqueCatg = (data: Product[], field: string) => {
    let newElement = data.map((curElement: any) => {
      return curElement[field];
    });
    return (newElement = [...new Set(newElement)]);
  };

  const categoryType = getUniqueCatg(data, "category");

  const generateRange = (min: number, max: number, interval: number) => {
    let i = min;
    let ranges = [];
    while (i < max) {
      let rangString = `${i}-`;
      i += interval;
      rangString += `${i - 1}`;
      ranges.push(rangString);
    }
    return ranges;
  };

  const ranges = generateRange(0, 500, 50);

  const handelCategorychange = (event: any) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
      console.log(category);
    } else {
      setSelectedCategories(
        selectedCategories.filter((catg: any) => catg !== category)
      );
    }
  };

  console.log(selectedCategories);

  const handleRangeChange = (event: any) => {
    const range = event.target.value;
    if (event.target.checked) {
      setSelectedRanges([...selectedRanges, range]);
    } else {
      setSelectedRanges(selectedRanges.filter((r: any) => r !== range));
    }
  };
  console.log(selectedRanges);

  function handleDropdown(event: any) {
    setdropdownSelected(event.target.value);
  }

  const generateRangeArray = (min: number, max: number, interval: number) => {
    let i = min;
    let ranges = [];
    while (i < max) {
      let range = [];
      range.push(i);
      i += interval;
      range.push(i - 1);
      ranges.push(range);
    }
    return ranges;
  };

  const rangesNumber = generateRangeArray(0, 500, 50);

  const checkIfInRange = (price: number) => {
    let range = "";
    rangesNumber.forEach((ranges) => {
      if (price >= ranges[0] && price < ranges[1]) {
        range = ranges.join("-");
      }
    });
    return range;
  };

  useEffect(() => {
    if (dropdownSelected === "priceMin-Max") {
      setProducts(data.sort((a, b) => Number(a.price) - Number(b.price)));
    }
    if (dropdownSelected === "priceMax-Min") {
      setProducts(data.sort((a, b) => Number(b.price) - Number(a.price)));
    }

    const groupedData = data.reduce((acc: any, item: any) => {
      const category = item.category;
      const price = item.price;
      const range = checkIfInRange(price);
      const propName = "range";
      item[propName] = range;

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
      setProducts(data);
      console.log("data", data);
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
        setProducts(filteredData);
        setDataPresent(false);
      }
    }
  }, [selectedCategories, selectedRanges, dropdownSelected]);

  return (
    <div>
      {dataPresent && <div className="">no product is present</div>}

      {/* dropdown */}

      <select value={dropdownSelected} onChange={handleDropdown}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.lable}
            </option>
          );
        })}
      </select>

      {/* checkbox */}
      <ul>
        {categoryType.map((item, idx) => (
          <li key={idx}>
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
      <ul>
        {ranges.map((item, idx) => (
          <li key={idx}>
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
      <div>
        <ItemList products={products} />
      </div>
    </div>
  );
}

const ItemList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => {
        return <Item key={product.id} product={product} />;
      })}
    </div>
  );
};

const Item = ({ product }: { product: Product }) => {
  function addtoCart(event: any) {
    console.log("'addtocart");
  }

  return (
    <div className="border border-blue-50">
      <Link href={`/products/${product.id}`}>
        <div>{product.image}</div>
        <div>{product.title}</div>
        <div>{product.price}</div>
        <div>{product.category}</div>
        <div>{product.rating.rate}</div>
        <div>{product.rating.count}</div>
      </Link>
      <button onClick={addtoCart}>+</button>
    </div>
  );
};
