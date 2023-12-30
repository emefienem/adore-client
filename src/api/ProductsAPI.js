import { useState, useEffect } from "react";
import axios from "axios";
const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return {
    products: [products, setProducts],
  };
};

export default ProductsAPI;
