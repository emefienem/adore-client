import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div style={{ display: "flex", background: "whitesmoke" }}>
      <div className="product-container">
        <div className="product animate-left">
          <img src="/images/jewelry1.jpg" alt="Jewelry 1" />
        </div>

        <div className="product animate-bottom">
          <img src="/images/jewelry2.jpg" alt="Jewelry 2" />
        </div>

        <div className="product">
          <img src="/images/jewelry3.jpg" alt="Jewelry 3" />
        </div>

        <div className="product">
          <img src="/images/jewelry11.jpg" alt="Jewelry 4" />
        </div>
      </div>

      <div style={{ margin: "15px" }}>
        <div className="product animate-right">
          <img src="/images/jewelry4.jpg" alt="Jewelry 5" />
        </div>
        <div className="product animate-bottom">
          <img src="/images/jewelry5.jpg" alt="Jewelry 6" />
        </div>
        <div className="product">
          <img src="/images/jewelry6.jpg" alt="Jewelry 7" />
        </div>
        <div className="product">
          <img src="/images/jewelry7.jpg" alt="Jewelry 8" />
        </div>
        <div className="product">
          <img src="/images/jewelry8.jpg" alt="Jewelry 9" />
        </div>
        <div className="product">
          <img src="/images/jewelry9.jpg" alt="Jewelry 10" />
        </div>
        <div className="product">
          <img src="/images/jewelry10.jpg" alt="Jewelry 11" />
        </div>
      </div>
    </div>
  );
};

export default Home;
