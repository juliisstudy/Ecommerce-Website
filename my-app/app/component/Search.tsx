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
      params.set("page", "1");
      if (term) {
        params.set(name, term);
      } else {
        params.delete(name);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

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
          createQueryString("filter", e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
