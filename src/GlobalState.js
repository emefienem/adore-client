import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.get(
        "https://adore-server.onrender.com/user/refresh-token",
        { withCredentials: true }
      );
      setToken(res.data.accesstoken);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);

  ProductsAPI();

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(token),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
