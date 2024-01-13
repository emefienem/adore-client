import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const api = process.env.REACT_APP_SERVER_URL;

const ResetPassword = () => {
  const resetToken = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/user/reset-password`, resetToken, newPassword);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
        <input
          type="password"
          name="password"
          value={newPassword}
          required
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div className="row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
