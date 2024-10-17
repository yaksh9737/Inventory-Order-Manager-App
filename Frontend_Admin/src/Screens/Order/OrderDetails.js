import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import apiHelper from "../../Commen/ApiHelper";
import { Card, Button, Chip } from "@mui/material";
import Constents from "../../Commen/constents";
import { Path } from "../../Commen/Path";
import OrderStaps from "../../Components/OrderStaps";

export default function OrderDetails({ setAuth, Auth }) {
  const { id } = useParams();
  const [Order, setOrder] = useState({});
  const navigate = useNavigate()

  const orderDetails = async () => {
    try {
      const result = await apiHelper.getOrderDetails(id);
      if (result.status === 200) {
        setOrder(result.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    orderDetails();
    // eslint-disable-next-line 
  }, []);


  const updateOrder = async ({ orderStatus, deliveryStatus }) => {
    try {
      const data = {
        orderedBy: Order.orderedBy?._id,
        orderedFor: Order.orderedFor?._id,
        lastActionedBy: Auth._id,
        orderStatus: orderStatus,
        deliveryStatus: deliveryStatus,
        paymentMethod: Order.paymentMethod,
        paymentStatus: Order.paymentStatus,
        qty: Order.qty,
        _id: Order._id,
        deliveryDue: Order.deliveryDue,
        productId: Order.productId._id,
      }
      let result = await apiHelper.getStockDetails(Auth._id, Order.productId._id)
      result = result.data.data
      if (result.qty < Order.qty) return window.alert((Order.qty - result.qty) + " packs are missing to complete the order, add new stock before accept this Order.")
      await apiHelper.updateOrder(data)
      navigate(Path.orderlist)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(Order)
  return (
    <>
      <div className="d-flex mb-3 justify-content-between">
        <h3>Order  #<b>{Order._id}</b></h3>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 mb-2 col-md-4" style={{ display: "table" }}>
          <Card className="p-3" style={{ display: "table-cell" }}>
            <h5 className="fw-bold">Customer Details</h5>
            <hr />
            <b className="mb-1 d-inline-block">
              Customer Name:&nbsp;
            </b>
            <span>
              {Order?.orderedBy?.fullName || "N/A"}
            </span>
            <br />
            <b className="mb-1 d-inline-block">
              Customer Phone:&nbsp;
            </b>
            <span>
              {Order?.orderedBy?.phone || "N/A"}
            </span>

            <br />
            <b className="d-inline-block mb-1">
              Customer City:&nbsp;
            </b>
            <span>
              {Order?.orderedBy?.city || "N/A"}
            </span>
            <br />
            <b className="d-inline-block mb-1">
              Customer Address:&nbsp;
            </b>
            <span>
              {Order?.address || "N/A"}
            </span>
          </Card>
        </div>
        <div className="col-12 mb-2 col-md-4" style={{ display: "table" }}>
          <Card className="p-3" style={{ display: "table-cell" }}>
            <h5 className="fw-bold">Order Details</h5>
            <hr />
            <b className="d-inline-block mb-1">
              Order Date:&nbsp;
            </b>
            <span>
              {
                Order.createdAt ? new Date(Order.createdAt).toDateString() : "N/A"
              }
            </span>
            <br />
            <b className="d-inline-block mb-1">
              Delivery Due:&nbsp;
            </b>
            <span>
              {
                Order.deliveryDue ? new Date(Order.deliveryDue).toDateString() : "N/A"
              }
            </span>
            <br />
            <b className="d-inline-block mb-1">
              Total Amount:&nbsp;
            </b>
            <span>
              {
                Order.totalAmount ? `INR ${Order.totalAmount}` : "N/A"
              }
            </span>
            <br />
            <b className="d-inline-block mb-1">
              Last Actioned By:&nbsp;
            </b>
            <span>
              {
                Constents.roles[Order.lastActionedBy?.role]?.toUpperCase() || "N/A"
              }
            </span>
            <br />
            <b className="d-inline-block mb-3">
              Order Status:&nbsp;
            </b>
            <span>
              {
                Order.orderStatus !== undefined ? <Chip color={Order.orderStatus === 0 ? "warning" : Order.orderStatus === 1 ? "info" : Order.orderStatus === 2 ? "success" : "error"} style={{ minWidth: "100px" }} label={Constents.orderStatus[Order.orderStatus]?.toUpperCase()} /> : "N/A"
              }
            </span>
          </Card>
        </div>
        <div className="col-12 mb-2 col-md-4" style={{ display: "table" }}>
          <Card className="p-3" style={{ display: "table-cell" }}>
            <h5 className="fw-bold">Product Details</h5>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6 pe-0">
                {Order?.productId?.productImage?.url && <img src={Order?.productId?.productImage?.url} style={{ float: "left", marginRight: "0.5rem", borderRadius: "5px" }} alt="img" width={"100%"} height={"100%"} />}
              </div>
              <div className="col-12 col-md-6 pe-0">
                <b className="d-inline-block mb-1">
                  Product:&nbsp;
                </b>
                <span>
                  {
                    Order?.productId?.title || "N/A"
                  }
                </span>
                <br />
                <b className="d-inline-block mb-1">
                  Price:&nbsp;
                </b>
                <span>
                  {
                    Order?.stockData?.sellingPrice || "N/A"
                  }
                </span>
                <br />
                <b className="d-inline-block mb-1">
                  Quentity:&nbsp;
                </b>
                <span>
                  {
                    Order?.qty || "N/A"
                  }
                </span>
                <br />
                <b className="d-inline-block mb-1">
                  Delivery Status:&nbsp;
                </b>
                <span>
                  {
                    Order.deliveryStatus !== undefined ? <Chip color={Order.deliveryStatus === 0 ? "warning" : Order.deliveryStatus === 1 ? "success" : "error"} style={{ minWidth: "100px" }} label={Constents.deliveryStatus[Order.deliveryStatus]?.toUpperCase()} /> : "N/A"
                  }
                </span>
              </div>
            </div>
          </Card>
        </div>
        {
          Order.orderStatus <= 2 && Order.deliveryStatus < 1 && (
            <div className="col-12 mt-2 col-md-4" style={{ display: "table" }}>
              <Card className="p-3" style={{ display: "table-cell" }}>
                <OrderStaps activeStep={Order.orderStatus === 0 ? 0 : Order.orderStatus === 1 ? 1 : (Order.orderStatus === 2 && Order.deliveryStatus === 0) ? 2 : (Order.orderStatus === 2 && Order.deliveryStatus === 0) ? 3 : Order.deliveryStatus === 1 ? 4 : -1} />
                <div className="d-flex justify-content-between flex-wrap mt-4 gap-2">
                  {Order.orderStatus > 0 ? <Button onClick={() => {
                    if (window.confirm("Are You sure to cancell this order ?")) return updateOrder({ orderStatus: 3, deliveryStatus: 2 })
                  }} size="small" color="error" variant="contained">
                    Return or Cancell Order
                  </Button> : ""}
                  {Order?.orderStatus === 0 && (
                    <Button onClick={async () => {
                      updateOrder({ orderStatus: 1, deliveryStatus: Order.deliveryStatus })
                    }} size="small" color="primary" variant="contained">
                      Accept
                    </Button>
                  )}
                  {Order?.orderStatus === 1 && (
                    <Button onClick={() => updateOrder({ orderStatus: 2, deliveryStatus: Order.deliveryStatus })} size="small" color="success" variant="contained">
                      Dispatch
                    </Button>
                  )}
                </div>
              </Card>
            </div>)
        }
      </div >

    </>
  );
}

