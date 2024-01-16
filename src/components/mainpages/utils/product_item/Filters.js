import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Filters = () => {
  const state = useContext(GlobalState);
  const [category, setCategory] = state.productsAPI.category;
  const [categories] = state.categoriesAPI.categories;
  const [sort, setSort] = state.productsAPI.sort;
  const [icon, setIcon] = useState(false);
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const toggleIcon = () => {
    setIcon(!icon);
  };

  return (
    <>
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

      <div className="search-menu">
        <div className="search-icon" onClick={toggleIcon}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              border: "1px solid gray",
              background: "whitesmoke",
              padding: "5px",
              borderRadius: "50%",
              cursor: "pointer",
              margin: "5px",
            }}
          />
        </div>

        {icon && (
          <input
            type="text"
            value={search}
            placeholder="Enter the name of product"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        )}
      </div>
    </>
  );
};

export default Filters;
