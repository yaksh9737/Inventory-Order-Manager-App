
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css"
// import Constents from "../Commen/Constents";
// import apiHelper from "../Commen/ApiHelper";
// import { Path } from "../Commen/Path";

// const Checkout = () => {
//   // const state = useSelector((state) => state.handleCart);
//   const state = JSON.parse(localStorage.getItem("product"))
//   const [address, setAddress] = useState("");
//   const userDetails = Constents.getUserDetails();
//   const navigate = useNavigate()

//   const orderNow = async () => {
//     try {
//       const data = {
//         productId: state.productId._id,
//         orderedFor: userDetails.adminDetails._id,
//         orderedBy: userDetails._id,
//         qty: state.qty,
//         lastActionedBy: userDetails._id,
//         address: address,
//         totalAmount: Math.round(state.sellingPrice * state.qty)
//       };
//       if (!data.address) return alert("Please Enter Address!")
//       await apiHelper.createOrder(data)
//       navigate(Path.Orderdetails)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   orderNow();
//   // };

//   return (
//     <>
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Checkout</h1>
//         <hr />
//         {/* <ShowCheckout /> */}
//         <div className="container py-5">
//           <div className="row my-4">
//             <div className="col-md-5 col-lg-4 order-md-last">
//               <div className="card mb-4">
//                 <div className="card-header py-3 bg-light">
//                   <h5 className="mb-0">Order Summary</h5>
//                 </div>
//                 <div className="card-body">
//                   <ul className="list-group list-group-flush">
//                     <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                       Products<span>₹ {Math.round(state.sellingPrice)}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center px-0">
//                       Quantity
//                       <span>{state.qty}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                       <div>
//                         <strong>Total amount</strong>
//                       </div>
//                       <span>
//                         <strong>₹ {Math.round(state.sellingPrice * state.qty)}</strong>
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-7 col-lg-8">
//               <div className="card mb-4">
//                 <div className="card-header py-3">
//                   <h4 className="mb-0">Billing address</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="needs-validation">
//                     <div className="row g-3">
//                       <div className="col-12 my-1">
//                         <label htmlFor="address" className="form-label">
//                           Address
//                         </label>
//                         <textarea
//                           type="text"
//                           className="form-control"
//                           id="address"
//                           placeholder="1234 Main St"
//                           value={address}
//                           onChange={(e) => setAddress(e.target.value)}
//                           required
//                         />
//                         <div className="invalid-feedback">
//                           Please enter your shipping address.
//                         </div>
//                       </div>
//                     </div>

//                     <hr className="my-4" />
//                     <h5 className="mb-4">Order Information</h5>
//                     <section className="h-100" style={{ backgroundColor: "#eee" }}>
//                       <div className="container py-3 h-100">
//                         <div className="row d-flex justify-content-center align-items-center h-100">
//                           <div className="col">
//                             <div className="card shadow">
//                               <div className="card-body p-4">
//                                 <div className="row">
//                                   <div className="d-flex flex-row align-items-center text-center justify-content-between flex-md-row flex-column">
//                                     <div>
//                                       <img
//                                         src={state.productId?.productImage?.url}
//                                         className="img-fluid rounded-3"
//                                         alt="Shopping item"
//                                         style={{ height: "5rem" }}
//                                       />
//                                     </div>
//                                     <div className="ms-3">
//                                       <h5 className="mb-3">Name</h5>
//                                       <h5>{state.productId?.title}</h5>
//                                     </div>
//                                     <div className="ms-3">
//                                       <h5 className="mb-3">Quantity</h5>
//                                       <h5>{state.qty}</h5>
//                                     </div>
//                                     <div className="ms-3 px-4">
//                                       <h5 className="mb-3">Price</h5>
//                                       <h5>₹ {state.sellingPrice}</h5>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </section>

//                     <hr className="my-4" />

//                     <button
//                       className="w-100 btn btn-primary "
//                       type="submit"
//                       onClick={orderNow}
//                     >
//                       Order Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import Constents from "../Commen/Constents";
import apiHelper from "../Commen/ApiHelper";
import { Path } from "../Commen/Path";
import { Snackbar, Alert } from "@mui/material";

const Checkout = () => {
  const state = JSON.parse(localStorage.getItem("product"));
  const [address, setAddress] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const userDetails = Constents.getUserDetails();
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const orderNow = async () => {
    try {
      if (!address) {
        setSnackbar({
          open: true,
          message: "Please enter your shipping address!",
          severity: "error",
        });
        return;
      }

      const data = {
        productId: state.productId._id,
        orderedFor: userDetails.adminDetails._id,
        orderedBy: userDetails._id,
        qty: state.qty,
        lastActionedBy: userDetails._id,
        address: address,
        totalAmount: Math.round(state.sellingPrice * state.qty),
      };

      await apiHelper.createOrder(data);
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      navigate(Path.Orderdetails);
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Failed to place order. Please try again!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products<span>₹ {Math.round(state.sellingPrice)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Quantity
                      <span>{state.qty}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>₹ {Math.round(state.sellingPrice * state.qty)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <div className="needs-validation">
                    <div className="row g-3">
                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <h5 className="mb-4">Order Information</h5>
                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                      <div className="container py-3 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col">
                            <div className="card shadow">
                              <div className="card-body p-4">
                                <div className="row">
                                  <div className="d-flex flex-row align-items-center text-center justify-content-between flex-md-row flex-column">
                                    <div>
                                      <img
                                        src={state.productId?.productImage?.url}
                                        className="img-fluid rounded-3"
                                        alt="Shopping item"
                                        style={{ height: "5rem" }}
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <h5 className="mb-3">Name</h5>
                                      <h5>{state.productId?.title}</h5>
                                    </div>
                                    <div className="ms-3">
                                      <h5 className="mb-3">Quantity</h5>
                                      <h5>{state.qty}</h5>
                                    </div>
                                    <div className="ms-3 px-4">
                                      <h5 className="mb-3">Price</h5>
                                      <h5>₹ {state.sellingPrice}</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary "
                      type="submit"
                      onClick={orderNow}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Checkout;

