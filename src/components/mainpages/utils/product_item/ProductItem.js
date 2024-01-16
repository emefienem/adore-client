import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../products/Products.css";
import "./ProductItem.css";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../Loading/Loading";

const ProductItem = ({
  product,
  isAdmin,
  callback,
  setCallBack,
  setProducts,
  products,
  deleteProduct,
}) => {
  const exchangeRate = 1100;
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [loading, setLoading] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  if (loading)
    return (
      <div className="product-card">
        <Loading />
      </div>
    );

  return (
    <div className="product-card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt={product.title} />
      <div className="product-box">
        <h2>{product.title}</h2>
        <div className="dope">
          <span>₦{product.price}</span>
        </div>
      </div>

      <div className="row-btn">
        {isAdmin ? (
          <>
            <Link
              id="btn-buy"
              to="#!"
              onClick={() => {
                setLoading(true);
                deleteProduct(product._id, product.images.public_id);
              }}
            >
              DELETE
            </Link>

            <Link id="btn-view" to={`/edit-product/${product._id}`}>
              EDIT
            </Link>
          </>
        ) : (
          <>
            <Link id="btn-buy" to="#!" onClick={() => addCart(product)}>
              Buy
            </Link>

            <Link id="btn-view" to={`/detail/${product._id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
