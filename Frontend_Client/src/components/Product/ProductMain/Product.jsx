import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { Path } from "../../../Commen/Path";
const Product = ({ product }) => {
  const [qty, setqty] = useState(1)
  const navigate = useNavigate()
  const addToCart = () => {
    product = { ...product, qty }
    localStorage.setItem("product", JSON.stringify(product))
    navigate(Path.checkout)
  }
  return (
    <div>
      <div className="productSection">
        <div className="productShowCase mt-4">
          <div className="productGallery mt-3">
            <div className="productFullImg">
              <img src={product?.productId?.productImage?.url} alt="" />
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/home">Home</Link>&nbsp;/&nbsp;
              </div>
            </div>
            <div className="productName">
              <h1>{product.productId.title}</h1>
            </div>
            <div className="productPrice">
              <h3>₹ {product.sellingPrice}</h3>
            </div>
            <div className="productDescription">
              <p dangerouslySetInnerHTML={{ __html: product.productId.discription }} ></p>
            </div>
            <div className="product-content">
              <div className='d-flex justify-content-between conpniy_name'>

                <span className='float-right In_stock'>
                  {Product.countInstock <= 0 ? (
                    <p className='Out_stock'><span>Out of stock</span> : Unavailable </p>
                  ) : (
                    <p className='In_stock'><span>In stock</span> : Available</p>
                  )}
                </span>
              </div>
            </div>
            <div className="productCartQuantity">
              <div className='d-flex justify-content-center align-item-center ms-4'>
                <button onClick={() => setqty(qty - 1)} disabled={qty <= 0} className='btn fw-bold' style={{ background: "none", border: "none", color: "black", marginLeft: "-30px" }}>-</button>
                <span className='btn fw-bold' style={{ background: "none", border: "none", color: "black", marginTop: "3px", marginLeft: "-10px" }}>
                  {qty}
                </span>
                <button onClick={() => setqty(qty + 1)} disabled={qty >= product.qty} className='btn fw-bond' style={{ background: "none", border: "none", color: "black", marginLeft: "-10px", marginTop: "2px" }}>+</button>
              </div>

              <div className="productCartBtn">
                <button onClick={addToCart}>Place Order</button>
              </div>
            </div>
            <div className="productTags">
              <p>
                <span>CATEGORIES: </span>{product.productId.category.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
