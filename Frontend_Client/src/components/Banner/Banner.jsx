import React from "react";
import "./Banner.css";

import { Link } from "react-router-dom";

const Banner = () => {

  return (
    <div>
      <div className="banner">
        <div className="bannerLeft">
          <h3 className="bannerh3">Assam Garden Refresh Tea</h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={""} style={{ color: "white" }}>
              Shop Now
            </Link>
          </h5>
        </div>
        <div className="bannerRight">
         
          <h3 className="bannerh3" style={{ color: "white" }}>
            Tested by Tea Experts
          </h3>
          <h5 className="bannerh5">
            <Link to="/shop" onClick={""} style={{ color: "white" }}>
              Shop Now
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Banner;
