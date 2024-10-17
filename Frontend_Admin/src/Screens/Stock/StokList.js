import { useEffect, useState } from "react";
import apiHelper from "../../Commen/ApiHelper";
import { Button, Card } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { Path } from "../../Commen/Path";

export default function StockList({ Auth }) {
    const [Products, setProducts] = useState([])
    const navigate = useNavigate()

    const getStock = async () => {
        try {
            const result = await apiHelper.listStock(Auth._id)
            setProducts(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const orderNewStock = async (productId) => {
        try {
            const qty = Number(window.prompt("Please Enter a Number of packs."));
            if (!qty) return window.alert("Something went wrong with the entered number of packs");
            const orderDetails = {
                orderedFor: Auth.adminDetails?._id,
                orderedBy: Auth._id,
                productId,
                qty: qty,
                lastActionedBy: Auth._id
            };
            await apiHelper.createOrder(orderDetails);
            navigate(Path.yourOrders)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStock()
        // eslint-disable-next-line
    }, [])



    if (Auth.role !== 1 || !Auth.adminDetails){
        return <Navigate  to={Path.dashboard}/>
    }



        return <>
            <div className="d-flex mb-3 justify-content-between align-items-center">
                <h3>Products</h3>
            </div>
            <div className="row">
                {
                    Products.map((x) => {
                        return <div key={x._id} className="col-12 col-md-6 mb-2" style={{ display: "table" }}>
                            <Card className="p-3" style={{ display: "table-cell" }}>
                                <h5 className="fw-bold">{x.productId?.title || "N/A"}</h5>
                                <hr />
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <img className="mb-2" src={x.productId?.productImage?.url} style={{ float: "left", marginRight: "0.5rem", borderRadius: "5px" }} alt="img" width={"100%"} height={"200px"} />
                                    </div>
                                    <div className="col-12  col-lg-6">
                                        <b className="d-inline-block mb-1">
                                            Product Name:&nbsp;
                                        </b>
                                        <span>
                                            {
                                                x?.productId?.name || "N/A"
                                            }
                                        </span>
                                        <br />
                                        <b className="d-inline-block mb-1">
                                            Availabel Quantity:&nbsp;
                                        </b>
                                        <span>
                                            {
                                                x.qty || "N/A"
                                            }
                                        </span>
                                        <br />
                                        <b className="d-inline-block mb-1">
                                            Actuall Price:&nbsp;
                                        </b>
                                        <span>
                                            {
                                                x.productId?.price || "N/A"
                                            }
                                        </span>
                                        <br />
                                        <b className="d-inline-block mb-1">
                                            Selling Price:&nbsp;
                                        </b>
                                        <span>
                                            {
                                                x.sellingPrice || "N/A"
                                            }
                                        </span>
                                        <br />
                                        <Button onClick={() => orderNewStock(x.productId?._id)} variant="contained" className="mt-2">Click for new Order</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    })
                }
            </div>
        </>
}