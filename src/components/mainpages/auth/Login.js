import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const api = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${api}/user/login`,
        { ...user },
        { withCredentials: true }
      );
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <p style={{ textAlign: "center", color: "#fff", background: "red" }}>
          {message}
        </p>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={onChangeInput}
          value={user.email}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
        <p>
          Forgot Password?
          <span>
            <Link to="/forgot-password">Click here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
