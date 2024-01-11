import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    user: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      // alert(error.response.data.msg);
      setMessage(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register </h2>
        <p style={{ textAlign: "center", color: "#fff", background: "red" }}>
          {message}
        </p>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={onChangeInput}
          value={user.name}
        />

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
          <button type="submit">Register</button>
          <Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
