import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/user/forgot-password",
        { email }
      );
      // alert("Link sent");
      setMessage("Link sent");
    } catch (error) {
      // alert(error.msg);
      setMessage(error.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <span>{message}</span>
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
