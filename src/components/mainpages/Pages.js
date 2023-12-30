import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import DetailProduct from "./products/detailProduct/DetailProduct";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/detail/:id" exact element={<DetailProduct />} />
      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
