import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import "./Products.css";
import Loading from "../utils/Loading/Loading";
import Filters from "../utils/product_item/Filters";
import LoadMore from "../utils/product_item/LoadMore";

const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [message] = state.userAPI.message;
  const [callback, setCallBack] = state.productsAPI.callback;
  const [isChecked, setIsChecked] = useState(false);
  const [token] = state.token;
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "https://adore-server.onrender.com/api/destroy",
        { public_id: public_id },
        { headers: { Authorization: token } }
      );

      const deleteProduct = axios.delete(
        `https://adore-server.onrender.com/api/products/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      await destroyImg;
      await deleteProduct;
      setLoading(false);
      setCallBack(!callback);
    } catch (error) {
      console.error(error);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isChecked;
    });
    setProducts([...products]);
    setIsChecked(!isChecked);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading) return <Loading />;
  return (
    <div className="body">
      <Filters />
      {isAdmin && (
        <div
          className="delete-all"
          style={{ textAlign: "right", margin: "20px" }}
        >
          <span
            style={{
              textTransform: "uppercase",
              color: "blue",
              letterSpacing: "1.3px",
            }}
          >
            Select all
          </span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={checkAll}
            style={{
              height: "25px",
              width: "25px",
              transform: "translateX(5px)",
              margin: "0 15px",
            }}
          />
          <button
            onClick={deleteAll}
            style={{
              border: "1px solid crimson",
              padding: "10px 25px",
              color: "crimson",
              textTransform: "uppercase",
            }}
          >
            Delete ALL
          </button>
        </div>
      )}

      {message && (
        <p
          style={{
            textAlign: "center",
            padding: "5px",
            margin: "5px",
            color: "#000",
            backgroundColor: "#dddddd",
          }}
        >
          {message}
        </p>
      )}

      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              setProducts={setProducts}
              isAdmin={isAdmin}
              callback={callback}
              setCallBack={setCallBack}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </div>
  );
};

export default Products;
