import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import DetailProduct from "./products/detailProduct/DetailProduct";
import { GlobalState } from "../../GlobalState";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Contact from "./information/Contact";
import Home from "./home/Home";
import Subscribers from "./information/Subscribers";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/shop" exact element={<Products />} />
      <Route path="/contact" exact element={<Contact />} />
      <Route
        path="/login"
        exact
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        path="/register"
        exact
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route
        path="/forgot-password"
        exact
        element={isLogged ? <NotFound /> : <ForgotPassword />}
      />
      <Route
        path="/reset-password/:resetToken"
        exact
        element={isLogged ? <NotFound /> : <ResetPassword />}
      />
      <Route
        path="/category"
        exact
        element={isLogged ? <Categories /> : <NotFound />}
      />
      <Route
        path="/create-product"
        exact
        element={isLogged ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/edit-product/:id"
        exact
        element={isLogged ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/subscribers"
        exact
        element={isLogged ? <Subscribers /> : <NotFound />}
      />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/detail/:id" exact element={<DetailProduct />} />
      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
