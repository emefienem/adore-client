import { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallBack] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?limit=${
            page * 9
          }&${category}&${sort}&title[regex]=${search}`
        );
        setProducts(res.data.products);
        setResult(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [callback, page, category, sort, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallBack],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default ProductsAPI;
