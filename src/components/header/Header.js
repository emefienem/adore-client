import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faShoppingBag,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalState } from "../../GlobalState";
import "./Header.css";
// const api = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const user = state.userAPI.user;
  const [showUserEmail, setShowUserEmail] = useState(false);
  const [search, setSearch] = state.productsAPI.search;
  const [icon, setIcon] = useState(false);

  const toggleUserEmail = () => {
    setShowUserEmail(!showUserEmail);
  };

  const closeUserEmail = () => {
    setShowUserEmail(false);
  };

  const toggleIcon = () => {
    setIcon(!icon);
  };

  const adminRouter = () => {
    return (
      <>
        <li className="menu-item">
          <Link to="/create-product">Create Product</Link>
        </li>
        <li className="menu-item">
          <Link to="/category">Categories</Link>
        </li>
        <li className="menu-item">
          <Link to="/subscribers">Subscribers</Link>
        </li>
      </>
    );
  };

  const loggedOut = async () => {
    await axios.get("https://adore-jewelries-api.onrender.com/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const loggedRouter = () => {
    return (
      <>
        {isAdmin ? (
          <li className="menu-item">
            <Link to="/history">History</Link>
          </li>
        ) : (
          ""
        )}

        {isAdmin ? (
          <li className="menu-item">
            <Link to="/" onClick={loggedOut}>
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}

        {user && (
          <li className="user-dropdown">
            {isAdmin ? (
              ""
            ) : (
              <div onClick={toggleUserEmail} className="user-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
            {showUserEmail && (
              <div className="user-dropdown-content">
                <span onClick={closeUserEmail}>{user.email}</span>
                <li className="menu-item">
                  <Link to="/" onClick={loggedOut}>
                    Logout
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/history">History</Link>
                </li>
              </div>
            )}
          </li>
        )}
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="logo">
        <Link to="/">
          <img src="/images/amaka-logo.jpg" alt="logo" className="logo3" />
        </Link>
      </div>

      <div className="search-menu">
        <div className="search-icon" onClick={toggleIcon}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              border: "1px solid gray",
              background: "whitesmoke",
              padding: "5px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>

        {icon && (
          <input
            type="text"
            value={search}
            placeholder="Enter the name of product"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        )}
      </div>

      <ul style={styleMenu}>
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/shop">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        <li className="menu-item">
          <Link to="/contact">Contact</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <GuestMenu />
          </>
        )}
        <li onClick={() => setMenu(!menu)}>
          <FontAwesomeIcon icon={faClose} className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingBag} style={{ width: "40px" }} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

const GuestMenu = () => {
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleUserIconClick = () => {
    setShowAuthOptions(!showAuthOptions);
  };

  return (
    <>
      <li className="user-dropdown" onClick={handleUserIconClick}>
        <div className="user-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {showAuthOptions && (
          <div className="user-dropdown-content">
            <li className="menu-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="menu-item">
              <Link to="/register">Register</Link>
            </li>
          </div>
        )}
      </li>
    </>
  );
};
