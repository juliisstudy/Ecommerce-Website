"use client";
import { useDebouncedCallback } from "use-debounce";
import { useState, SetStateAction } from "react";
import { getProductsList } from "@/app/lib/getData";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="p-4 py-6"
        placeholder={placeholder}
        data-lpignore="true"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

//   const [input, setInput] = useState("");

//   async function fetchData({ term }: { term: string }) {
//     //const productsList: Promise<Product[]> = getProductsList();
//     //const products = await productsList;
//     products.filter((product) => {
//       return (
//         (term && product && product.title.toLowerCase().includes(term)) ||
//         product.category.toLowerCase().includes(term)
//       );
//     });
//   }

//   const handleSearch = useDebouncedCallback((term) => {
//     console.log(`search...${term}`);
//     setInput(term);

//     //fetchData(term);
//   }, 300);

//   return (
//     <div className="relative flex flex-1 flex-shrink-0">
//       <label htmlFor="search" className="sr-only">
//         Search
//       </label>
//       <input
//         className="p-4 py-6"
//         placeholder={placeholder}
//         data-lpignore="true"
//         onChange={(e) => {
//           handleSearch(e.target.value);
//         }}
//         value={input}
//       />
//     </div>
//   );
// }

// "use client";
// import { useDebouncedCallback } from "use-debounce";
// import { useState, SetStateAction } from "react";
// import { getProductsList } from "@/app/lib/getData";

// export default function Search({ placeholder }: { placeholder: string }) {
//   const [input, setInput] = useState("");

//   //   async function fetchData({ term }: { term: string }) {
//   //     //const productsList: Promise<Product[]> = getProductsList();
//   //     //const products = await productsList;
//   //     products.filter((product) => {
//   //       return (
//   //         (term && product && product.title.toLowerCase().includes(term)) ||
//   //         product.category.toLowerCase().includes(term)
//   //       );
//   //     });
//   //   }

//   const handleSearch = useDebouncedCallback((term) => {
//     console.log(`search...${term}`);
//     setInput(term);

//     //fetchData(term);
//   }, 300);

//   return (
//     <div className="relative flex flex-1 flex-shrink-0">
//       <label htmlFor="search" className="sr-only">
//         Search
//       </label>
//       <input
//         className="p-4 py-6"
//         placeholder={placeholder}
//         data-lpignore="true"
//         onChange={(e) => {
//           handleSearch(e.target.value);
//         }}
//         value={input}
//       />
//     </div>
//   );
// }
