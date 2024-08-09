"use client";
import { useDebouncedCallback } from "use-debounce";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const createQueryString = useDebouncedCallback(
    (name: string, term: string) => {
      const params = new URLSearchParams(searchParams);
      // params.set("page", "1");
      if (term) {
        params.set(name, term);
      } else {
        params.delete(name);
      }
      replace(`${pathname}?${params.toString()}`);
      console.log(params);
    },
    300
  );

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
          createQueryString("filter", e.target.value);
        }}
        defaultValue={searchParams.get("filter")?.toString()}
      />
    </div>
  );
}
