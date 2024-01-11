import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import "./DetailProduct.css";
import ProductItem from "../../utils/product_item/ProductItem";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [products, params.id]);
  if (detailProduct.length === 0) return 0;
  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6
              style={{
                backgroundColor: "red",
                padding: "8px",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              ID: {detailProduct.product_id}
            </h6>
          </div>
          <span>${detailProduct.price}</span>
          <div>Content:</div>
          <p>{detailProduct.content}</p>
          <div>Description:</div>
          <p>{detailProduct.description}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2 style={{ textAlign: "center", margin: "15px", color: "cadetblue" }}>
          Related Products{" "}
        </h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
