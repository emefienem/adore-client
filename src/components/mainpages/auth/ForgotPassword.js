import React, { useState } from "react";
import axios from "axios";
// const api = process.env.REACT_APP_SERVER_URL;

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://adore-jewelries-api.onrender.com/user/forgot-password",
        { email }
      );
      setMessage("Link Sent");
    } catch (error) {
      setMessage(error.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <p style={{ textAlign: "center", color: "#fff", background: "gray" }}>
          {message}
        </p>
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
