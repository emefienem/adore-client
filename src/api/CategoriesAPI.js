import { useState, useEffect } from "react";
import axios from "axios";
// const api = process.env.REACT_APP_SERVER_URL;

const CategoriesAPI = (token) => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        "https://adore-server.onrender.com/api/category"
      );
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoriesAPI;
