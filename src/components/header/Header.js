import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalState } from "../../GlobalState";
import "./Header.css";
import { Dropdown, Menu, Space } from "antd";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const user = state.userAPI.user;
  const [showUserEmail, setShowUserEmail] = useState(false);
  const navigate = useNavigate();

  const toggleUserEmail = () => {
    setShowUserEmail(!showUserEmail);
  };

  const closeUserEmail = () => {
    setShowUserEmail(false);
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

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleMenuItemClick = (path) => {
    toggleMenu();
    navigate(path);
  };

  return (
    <header>
      <div className="menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="logo">
        <Link to="/">
          <img src="/images/amaka-logo.jpg" alt="logo" className="logo3" />
        </Link>
      </div>

      <ul style={styleMenu}>
        <li className="menu-item" onClick={() => handleMenuItemClick("/")}>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        <li
          className="menu-item"
          onClick={() => handleMenuItemClick("/contact")}
        >
          <Link to="/contact">Contact</Link>
        </li>
        {isAdmin && adminRouter()}
        <li onClick={toggleMenu}>
          <FontAwesomeIcon icon={faClose} className="menu" />
        </li>
      </ul>
      {isLogged ? (
        loggedRouter()
      ) : (
        <>
          <GuestMenu />
        </>
      )}
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

const menuItems = [
  {
    label: <Link to="/login">Login</Link>,
    key: "0",
  },
  {
    label: <Link to="/register">Register</Link>,
    key: "1",
  },
  {
    type: "divider",
  },
];

const GuestMenu = () => (
  <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <FontAwesomeIcon icon={faUser} />
      </Space>
    </a>
  </Dropdown>
);
