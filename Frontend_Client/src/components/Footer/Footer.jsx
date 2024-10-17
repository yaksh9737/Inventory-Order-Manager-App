import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Path } from "../../Commen/Path";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer_content">
          <h5>My tea store</h5>

          <p>Address</p>

          <div className="footer_address">
            <strong>a@gmail.com</strong>
            <strong>+91 12345 67890</strong>
          </div>
          <br />

          <div className="social_links">
            <FaFacebookF />
            <FaXTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaPinterest />
          </div>
        </div>

        <div className="footer_content">
          <h5>Company</h5>
          <div className="links_container">
            <ul>
              <li><Link to={Path.homescreen}>Home</Link></li>
              <li><Link to={Path.product}>Products</Link></li>
              <li><Link to={Path.about}>About</Link></li>
              {/* <li><Link to={Path.blog}>Blog</Link></li> */}
              <li><Link to={Path.contact}>Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer_right">
          <h5>Subscribe</h5>
          <p>Get the latest updates, promotions, and more!</p>

          <form onSubmit={handleSubscribe}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Join</button>
          </form>

          <h6>Secure Payments</h6>
          <div className="paymentIconContainer">
            <img src={"/assets/paymentIcon.png"} alt="Payment Icons" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
