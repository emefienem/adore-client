import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram } from "@fortawesome/free-brands-svg-icons";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";
// import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-information">
        <p className="larger-text">Get to know us</p>
        <p class="smaller-text">
          Please fill out the quick form and we will be in touch with lightning
          speed
        </p>
        <form action="">
          <input type="text" placeholder="Name" />

          <input type="text" placeholder="Email" />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="contact-right">
        <p>Connect with us:</p>
        <p>For support or any questions:</p>
        <p>
          Email us at
          <span class="span-email"> emefienemmichael@gmail.com</span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.075959772998!2d3.1718786695106047!3d6.483151232123262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b81e32d338b1b%3A0xc7ad935a5c61e123!2sCele%20nica%20bus%20stops%20opposite%20CKC%20church!5e0!3m2!1sen!2sng!4v1693939981075!5m2!1sen!2sng"
            width="650"
            height="300"
            style={{ border: "0", margin: "20px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </p>
      </div>
    </div>
  );
};

export default Contact;
