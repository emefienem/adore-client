import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./Filter.css";

const Filters = () => {
  const state = useContext(GlobalState);
  const [category, setCategory] = state.productsAPI.category;
  const [categories] = state.categoriesAPI.categories;
  const [sort, setSort] = state.productsAPI.sort;

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="filter-menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <span>Sort: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Price</option>
          <option value="sort=price">Highest Price</option>
          <option value="sort=-price">Lowest Price</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
