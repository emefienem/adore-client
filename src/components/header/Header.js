import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalState } from "../../GlobalState";
import "./Header.css";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "My Shop"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <FontAwesomeIcon icon={faClose} className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>0</span>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBag} style={{ width: "40px" }} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
