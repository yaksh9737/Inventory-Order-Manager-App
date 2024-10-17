// import React, { useEffect, useState } from "react";
// import Product from "../components/Product/ProductMain/Product";
// import { Footer, Navbar } from "../components";
// import RelatedProduct from "../components/Product/RelatedProducts/RelatedProducts";
// import { useParams } from "react-router-dom";
// import apiHelper from "../Commen/ApiHelper";
// // import AdditionalInfo from "../components/Product/AdditonInfo/AdditionalInfo";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
  
//   const getProductById = async () => {
//     try {
//       console.log(id)
//       const result = await apiHelper.listProductById(id);
//       console.log(result)
//       setProduct(result.data.data);  
//     } catch (error) {
//       console.log(error)      
//     }
//   };

//   useEffect(() => {
//     console.log("first")
//     getProductById()
//   }, [id])

//   return (
//     <>
//       <Navbar />
//       <Product id={id} />
//       {/* <AdditionalInfo /> */}
//       <RelatedProduct />
//       <Footer />

//       {/* <AdditionalInfo /> */}
//       {/* <RelatedProducts /> */}
//     </>
//   );
// };

// export default ProductDetails;




import React, { useEffect, useState } from "react";
import Product from "../components/Product/ProductMain/Product";
import RelatedProduct from "../components/Product/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import apiHelper from "../Commen/ApiHelper";
import Constents from "../Commen/Constents";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Changed initial state to null
  const [reletedProducts, setreletedProducts] = useState([]); // Changed initial state to null
  const userDetails = Constents.getUserDetails()

  const getProductById = async () => {
    try {
      const result = await apiHelper.listProductById(id);
      setProduct(result.data.data);
      let data = await apiHelper.listProduct(userDetails.adminDetails._id)
      data = data.data.data.filter((x) => x._id !== result.data.data._id)
      setreletedProducts(data)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProductById();
    // eslint-disable-next-line
  }, [id]); // Dependency array should include id

  return (
    <>
      {product ? (
        <Product product={product} /> // Pass the product data as a prop
      ) : (
        <p>Loading product...</p>
      )}
      <RelatedProduct reletedProducts={reletedProducts} />
    </>
  );
};

export default ProductDetails;
