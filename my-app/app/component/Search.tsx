"use client";
import { useDebouncedCallback } from "use-debounce";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`search...${term}`);
    const params = new URLSearchParams(searchParams);
    //    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="m-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className=" border border-slate-200 h-10 w-full rounded-lg pl-5"
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
