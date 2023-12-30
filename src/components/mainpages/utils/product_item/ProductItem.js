import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../products/Products.css";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images.url} alt="" />
      <div className="product-box">
        <h2>{product.title}</h2>

        <span>{product.price}</span>
        <p>{product.description}</p>
      </div>
      <div className="row-btn">
        <Link id="btn-buy" to="#!">
          Buy
        </Link>

        <Link id="btn-view" to={`detail/${product._id}`}>
          <FontAwesomeIcon icon={faEye} />
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
