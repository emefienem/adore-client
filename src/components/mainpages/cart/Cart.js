import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        let itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;

        if (item.quantity >= 3) {
          itemTotal *= 0.9;
        }

        return prev + itemTotal;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async () => {
    await axios.patch(
      "https://adore-jewelries-api.onrender.com/user/addcart",
      { cart },
      { headers: { Authorization: token } }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart();
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart();
  };

  const deleteItem = (id) => {
    if (window.confirm("Do you want to delete this product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart();
    }
  };

  if (cart.length === 0)
    return (
      <h2 style={{ fontWeight: 600, textAlign: "center", fontSize: "5rem" }}>
        Cart Empty
      </h2>
    );
  const exchangeRate = 1100;
  return (
    <div>
      {cart.map((product) => (
        <div key={product._id} className="detail cart">
          <img
            src={product.images.url}
            alt={product.title}
            className="img-container"
          />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                ${parseFloat(product.price.replace("$", "")) * product.quantity}
              </span>
              <span style={{ fontSize: "12px", color: "gray" }}>
                Naira: ₦
                {parseFloat(product.price.replace("$", "")) *
                  product.quantity *
                  exchangeRate}
              </span>
            </div>
            <div>Content:</div>
            <p>{product.content}</p>
            <div>Description:</div>
            <p>{product.description}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => deleteItem(product._id)}>
              {" "}
              X{" "}
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h4>Total : ${total}</h4>
        <Link to="#">Proceed to Payment</Link>
      </div>
    </div>
  );
};

export default Cart;
