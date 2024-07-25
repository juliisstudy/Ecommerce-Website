import React from "react";
import Search from "./Search";
export default function Nav() {
  return (
    <div>
      <div>Logo</div>
      {/* <ProductList/> */}
      <Search placeholder="Search players..." />
      <div>category</div>
    </div>
  );
}

const SearchBar = () => {};
