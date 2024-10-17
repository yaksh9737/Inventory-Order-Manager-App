// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link } from "react-router-dom";
// import apiHelper from "../Commen/ApiHelper";
// import Constents from "../Commen/Constents";

// const Products = () => {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState(data);
//   const [showProduct, setshowProduct] = useState([])
//   const [loading, setLoading] = useState(false);

//   const userDetails = Constents.getUserDetails()

//   const getProduct = async () => {
//     try {
//       setLoading(true)
//       const result = await apiHelper.listProduct(userDetails.adminDetails._id)
//       console.log(result)
//       setshowProduct(result.data.data)
//       setData(result.data.data)
//       setFilter(result.data.data)
//       setLoading(false)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getProduct()
//     // eslint-disable-next-line
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <div className="col-12 py-5 text-center">
//           <Skeleton height={40} width={560} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//         <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//           <Skeleton height={592} />
//         </div>
//       </>
//     );
//   };

//   const filterProduct = (cat) => {
//     console.log(data)
//     const updatedList = data.filter((item) => item.productId.category.name === cat);
//     console.log(updatedList)
//     setFilter(updatedList);
//     setshowProduct(updatedList)
//   }
//   const ShowProducts = () => {
//     return (
//       <>
//         <div className="buttons text-center py-5">
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setshowProduct(data)}>All</button>
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("10rs")}>10 Rs</button>
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("20rs")}>20 Rs</button>
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("250g")}>250 g</button>
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("500g")}>500 g</button>
//           <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("1kg")}>1 Kg</button>
//         </div>

//         {showProduct.length > 0 ? (
//           showProduct.map((product) => {
//             return (
//               <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
//                 <div className="card text-center h-100">
//                   <div className="card-header bg-dark text-light">
//                     {product.productId.category.name}
//                   </div>
//                   <Link to={"/product/" + product._id}>
//                     <img
//                       className="card-img-top p-3"
//                       src={product.productId.productImage.url}
//                       alt="Card"
//                       height={300}
//                     />
//                   </Link>
//                   <div className="card-body">
//                     <h5 className="card-title">
//                       {product.productId.title.substring(0, 12)}...
//                     </h5>
//                     <p className="card-text" dangerouslySetInnerHTML={{ __html: product.productId.discription.substring(0, 90) + '...' }}></p>
//                   </div>
//                   <ul className="list-group list-group-flush">
//                     <li className="list-group-item lead">₹ {product.sellingPrice}</li>
//                   </ul>
//                   <div className="card-body">
//                     <Link to={"/product/" + product._id} className="btn btn-dark m-1">
//                       Buy Now
//                     </Link>
//                     {/* <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
//               Add to Cart
//             </button> */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="col-12 text-center mt-5">
//             <div className="alert alert-warning" role="alert">
//               <h4 className="alert-heading">No Products Available</h4>
//               <p>We are currently out of stock. Please check back later or explore our other categories.</p>
//               <hr />
//             </div>
//           </div>
//         )}

//       </>
//     );
//   };
//   return (
//     <>
//       <div className="container my-3 py-3">
//         <div className="row">
//           <div className="col-12">
//             <h2 className="display-5 text-center">Our Tea Products</h2>
//             <hr />
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           {loading ? <Loading /> : <ShowProducts />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import apiHelper from "../Commen/ApiHelper";
import Constents from "../Commen/Constents";

const 
Products = () => {
  const [data, setData] = useState([]);
  const [showProduct, setshowProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const userDetails = Constents.getUserDetails();

  const getProduct = async () => {
    try {
      setLoading(true);
      const result = await apiHelper.listProduct(userDetails.adminDetails._id);
      console.log(result);
      setshowProduct(result.data.data);
      setData(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    console.log(data);
    const updatedList = cat === "All" ? data : data.filter((item) => item.productId.category.name === cat);
    console.log(updatedList);
    setshowProduct(updatedList);
    setSelectedFilter(cat);
  };

  const buttonStyle = (filterName) => ({
    backgroundColor: selectedFilter === filterName ? "#343a40" : "transparent",
    color: selectedFilter === filterName ? "white" : "black",
    border: "1px solid #343a40",
  });

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button style={buttonStyle("All")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("All")} >
            All
          </button>
          <button style={buttonStyle("10rs")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("10rs")} >
            10 Rs
          </button>
          <button style={buttonStyle("20rs")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("20rs")} >
            20 Rs
          </button>
          <button style={buttonStyle("250g")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("250g")} >
            250 g
          </button>
          <button style={buttonStyle("500g")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("500g")} >
            500 g
          </button>
          <button style={buttonStyle("1kg")} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("1kg")} >
            1 Kg
          </button>
        </div>

        {showProduct.length > 0 ? (
          showProduct.map((product) => {
            return (
              <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card text-center h-100">
                  <div className="card-header bg-dark text-light">
                    {product.productId.category.name}
                  </div>
                  <Link to={"/product/" + product._id}>
                    <img
                      className="card-img-top p-3"
                      src={product?.productId?.productImage?.url}
                      alt="Card"
                      height={300}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productId?.title?.substring(0, 12)}...
                    </h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: product.productId?.discription?.substring(0, 90) + '...' }}></p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">₹ {product.sellingPrice}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + product._id} className="btn btn-dark m-1">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center mt-5">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">No Products Available</h4>
              <p>We are currently out of stock. Please check back later or explore our other categories.</p>
              <hr />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Our Tea Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;

