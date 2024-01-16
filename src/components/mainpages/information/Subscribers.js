import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscribers.css";
import Loading from "../utils/Loading/Loading";

const Subscribers = () => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://adore-jewelries-api.onrender.com/user/subscribers",
        {
          text,
          subject,
        }
      );

      setMessage(res.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="this-div">
      <h1>Send Email to users</h1>
      <p
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          background: "gray",
          color: "#fff",
        }}
      >
        {message}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="rows">
          <input
            type="text"
            name="Text"
            placeholder="Text"
            required
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            name="Subject"
            placeholder="Subject"
            required
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Subscribers;
