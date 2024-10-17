import React from "react";
import "./AboutPage.css";
import "swiper/css";
import Services from "../Services/Services";

const AboutPage = () => {
  return (
    <div className="aboutPage">
      <div className="aboutSection">
        <h2>About Our Company</h2>
        <img
          src={"/assets/about us/tea-picker-woman-s-asian-hands-close-up-pretty-tea-picking-girl-plantation.webp"}
          alt="Tea Picker"
          className="aboutImage"
        />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <p className="boldText">
            Founded in 2002 by Kalgi and N.K.Mevada, we specialize in curated tea blends that create unforgettable moments. 
            Each blend tells a story of India's rich tea heritage, infused with spices, fruits, and flowers. 1868 celebrates 
            diversity and shares the tales of Truly Indian Tea Stories.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h4>Our Roots</h4>
              <p>
                In 2002, we started with a small yet ambitious vision in the tea business, believing that tea could make 
                the world a better place with its natural benefits.
              </p>
            </div>
            <div className="contentBox">
              <h4>Our Vision</h4>
              <p>
                Our founder's dedication and passion brought premium Indian teas to the world. Today, Tea India is available 
                across major cities in Gujarat and expanding globally.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img
                src={"/assets/about us/cup-with-tea-mint.webp"}
                alt="Tea with Mint"
                className="contentImage"
              />
            </div>
            <div className="textContent">
              <h4>The Company</h4>
              <p>
                Our journey wouldn't have been possible without the blessings of nature and the hard work of our farmers. 
                We hold ourselves to the highest environmental and social standards, ensuring that we give back to the 
                planet and people.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default AboutPage;
