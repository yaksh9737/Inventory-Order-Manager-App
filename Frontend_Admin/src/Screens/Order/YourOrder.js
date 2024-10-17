import { Navigate, useNavigate } from "react-router-dom";
import { Path } from "../../Commen/Path";
import { useEffect, useState } from "react";
import Constents from "../../Commen/constents";
import apiHelper from "../../Commen/ApiHelper";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Chip, MenuItem, Select, Tooltip } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

export default function YourOrders({ Auth }) {
    const navigate = useNavigate()
    const query = Constents.getQuery()
    const [Query, setQuery] = useState({
        role: query.role || (Auth.role > 0 ? Auth.role : "NAN"),
        deliveryStatus: query.deliveryStatus || "NAN",
        orderStatus: query.orderStatus || "NAN",
        productId: query.productId || "NAN",
        orderedBy: query.orderedBy || "NAN",
        city: query.city || (Auth.role > 0 ? Auth.city : "NAN")
    })
    const [Products, setProducts] = useState([])
    const [Orders, setOrders] = useState([])
    const [PaginationModel, setPaginationModel] = useState({
        pageSize: 8,
        page: 0
    })

    const getOrderlist = async () => {
        try {
            let keys = Object.keys(Query)
            let tmp = "?"
            keys.forEach((x) => {
                if (Query[x] !== "NAN" && Query[x] !== undefined) {
                    tmp += (x + "=" + Query[x] + "&")
                }
            })
            if (tmp[tmp.length - 1] === "&") {
                tmp = tmp.substring(0, tmp.length - 1)
            }
            const result = await apiHelper.listOrder(tmp.length <= 1 ? "" : tmp)
            setOrders([...result.data.data])
            navigate(Path.yourOrders + (tmp.length <= 1 ? "" : tmp))
        } catch (error) {
            console.log(error)
        }
    }


    const getProducts = async () => {
        try {
            const result = await apiHelper.listProduct()
            setProducts(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Auth && Auth.role > 0) {
            getOrderlist()
        }
        // eslint-disable-next-line
    }, [Query])

    useEffect(() => {
        if (Auth && Auth.role > 0) {
            getProducts()
        }
        // eslint-disable-next-line
    }, [])
    const DeliveredOrder = async (orderDetails) => {
        try {
            const data = {
                orderedBy: orderDetails.orderedBy?._id,
                orderedFor: orderDetails.orderedFor?.id,
                productId: orderDetails.productId?._id,
                lastActionedBy:Auth._id
            }

            delete orderDetails.orderedBy
            delete orderDetails.productId
            const sellingPrice = Number(window.prompt("Enter Selling Price For Sale Product"))
            if (isNaN(sellingPrice) || sellingPrice === 0) return window.alert("Somthing Went Wrong With Selling Price!")
            let stockDetails = await apiHelper.updateOrder({ ...orderDetails, ...data, deliveryStatus: 1 })
            stockDetails = stockDetails.data.data
            await apiHelper.updateStock({ _id: stockDetails?._id, qty: stockDetails?.qty, sellingPrice: sellingPrice })
            getOrderlist()
        } catch (error) {
            console.log(error)
        }
    }


    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
            field: "price", headerName: "Product Price(INR)", width: 200, renderCell: (cell) => {
                return cell.row?.productId?.price || "N/A"
            }
        },
        {
            field: "product", headerName: "Product", width: 200, renderCell: (cell) => {
                if (cell.row?.productId && cell.row?.productId?._id) {
                    return <Tooltip title={cell.row.productId.title}>
                        <span style={{ cursor: "pointer" }}> {cell.row.productId.title}</span>
                    </Tooltip>
                }
                return "N/A"
            }
        },
        {
            field: "orderStatus", headerName: "OrderStatus", width: 150, renderCell: (cell) => {
                return <Chip color={cell.row?.orderStatus < 1 ? "warning" : cell.row?.orderStatus < 2 ? "info" : cell.row?.orderStatus < 3 ? "success" : "error"} label={Constents.orderStatus[cell.row?.orderStatus]?.toUpperCase()} />

            }
        },
        {
            field: "qty", headerName: "Quantity", width: 150, renderCell: (cell) => {
                return <Tooltip title={"Total Packes " + cell.row?.qty}>
                    <span style={{ cursor: "pointer" }}>{cell.row?.qty}</span>
                </Tooltip>
            }
        },
        {
            field: "deliveryStatus", headerName: "Delivery Status", width: 150, renderCell: (cell) => {
                return <Chip color={cell.row?.deliveryStatus < 1 ? "warning" : cell.row?.deliveryStatus < 2 ? "success" : "error"} label={Constents.deliveryStatus[cell.row?.deliveryStatus]?.toUpperCase()} />

            }
        },
        {
            field: "deliveryDue", headerName: "Delivery Due", width: 150, renderCell: (cell) => {
                let date = new Date(cell.row?.deliveryDue)
                date = date.toString()
                date = date.substring(0, date.length - 40)
                return date
            }
        },
        {
            field: "OrderedAt", headerName: "Ordered AT", width: 150, renderCell: (cell) => {
                let date = new Date(cell.row?.createdAt)
                date = date.toString()
                date = date.substring(0, date.length - 40)
                return date
            }
        },
        {
            field: "action", width: 250, renderCell: (cell) => {

                return <>
                    {
                        cell.row.deliveryStatus === 0 && cell.row.orderStatus === 2 ? (<Button onClick={() => DeliveredOrder({ ...cell.row })} color="success" variant="outlined" endIcon={<ThumbUp />}>Delivered</Button>) : ""
                    }
                    {
                        
                      cell.row.orderStatus === 0 ?  <Button onClick={async () => {
                            try {
                                if (!window.confirm("Are sure to Remove this Order?")) return
                                await apiHelper.removeOrder(cell.row._id)
                                getOrderlist()
                            } catch (error) {
                                console.log(error)
                            }
                        }} color="error" variant="outlined" endIcon={<ThumbDown />}>Cancell Order</Button> :""
                    }


                </>


            }
        }

    ]


    if (Auth && Auth.role < 1) {
        return <Navigate to={Path.dashboard} />
    }


    return <>
        <div className="d-flex justify-content-between mb-3">
            <h3>Track Your Orders</h3>
            <Button variant="outlined" onClick={() => setQuery({
                role: Auth.role > 0 ? Auth.role : "NAN",
                city: Auth.role > 0 ? Auth.city : "NAN",
                orderStatus: "NAN",
                deliveryStatus: "NAN",
                productId: "NAN"
            })}>Clear Filter</Button>
        </div>
        <div style={{ maxWidth: "100%", flexWrap: "warp" }} className="row m-0 mb-3">
            <div className="col-lg-2 col-6 col-md-3 mb-2">
                <Select fullWidth value={Query.orderStatus} onChange={(e) => setQuery({ ...Query, orderStatus: !isNaN(Number(e.target.value)) ? e.target.value : "NAN" })}>
                    <MenuItem value={"NAN"}>--Filter Order Status--</MenuItem>
                    <MenuItem value={0}>{Constents.orderStatus[0]}</MenuItem>
                    <MenuItem value={1}>{Constents.orderStatus[1]}</MenuItem>
                    <MenuItem value={2}>{Constents.orderStatus[2]}</MenuItem>
                    <MenuItem value={3}>{Constents.orderStatus[3]}</MenuItem>
                </Select>
            </div>
            <div className="col-lg-2 col-6 col-md-3 mb-2">
                <Select fullWidth value={Query.deliveryStatus} onChange={(e) => setQuery({ ...Query, deliveryStatus: !isNaN(Number(e.target.value)) ? e.target.value : "NAN" })}>
                    <MenuItem value={"NAN"}>--Filter Delevery Status--</MenuItem>
                    <MenuItem value={0}>{Constents.deliveryStatus[0]}</MenuItem>
                    <MenuItem value={1}>{Constents.deliveryStatus[1]}</MenuItem>
                    <MenuItem value={2}>{Constents.deliveryStatus[2]}</MenuItem>
                    <MenuItem value={3}>{Constents.deliveryStatus[3]}</MenuItem>
                </Select>
            </div>
            <div className="col-lg-2 col-6 col-md-3 mb-2">
                <Select fullWidth value={Query.productId} onChange={(e) => setQuery({ ...Query, productId: e.target.value })}>
                    <MenuItem value={"NAN"}>--Filter With Products--</MenuItem>
                    {
                        Products?.map((x) => {
                            return <MenuItem key={x._id} value={x._id}>{x.title}</MenuItem>
                        })
                    }
                </Select>
            </div>
        </div>

        <DataGrid
            rows={[...Orders]}
            columns={columns}
            style={{ minHeight: 200 }}
            autoHeight={true}
            getRowId={(e) => e._id}
            paginationModel={PaginationModel}
            pagination={true}
            onPaginationModelChange={(e) => {
                setPaginationModel({ ...PaginationModel, page: e.page })
            }}
        />
    </>
}