import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

const LoadMore = () => {
  const state = useContext(GlobalState);
  // const [products, setProducts] = state.productsAPI.products;
  // const [category, setCategory] = state.productsAPI.category;
  // const [categories] = state.categoriesAPI.categories;
  // const [sort, setSort] = state.productsAPI.sort;
  // const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <div className="load-more">
      {result < page * 9 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}> Load More</button>
      )}
    </div>
  );
};

export default LoadMore;
