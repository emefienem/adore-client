import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./NewsLetter.css";

const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://adore-server.onrender.com/user/subscribe",
        {
          email,
        }
      );
      setMessage(response.data);

      handleClose();
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className={`newsletter-popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content">
        <p style={{ color: "#fff", background: "gray" }}>{message}</p>
        <p>Subscribe to our newsletter for updates!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
          <button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </button>
        </form>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "5%",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faClose} onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
